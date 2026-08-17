/**
 * Detecting "the migration has not been run yet" from a Supabase error.
 *
 * The migrations in supabase/migrations/ are applied by a human, not by the
 * app, so there is always a window — possibly a long one — where deployed code
 * expects columns or tables the database does not have yet. During that window
 * the important thing is that a visitor's submission is never silently thrown
 * away.
 *
 * Two error sources have to be recognised, because Supabase surfaces both:
 *   • PostgREST rejects the request before it reaches Postgres when its cached
 *     schema has no such column/table — code PGRST204 / PGRST205.
 *   • Postgres itself raises 42703 (undefined_column) / 42P01 (undefined_table)
 *     when PostgREST's cache is stale in the other direction.
 * Message matching is kept as a last resort only, since the wording varies
 * between versions while the codes do not.
 */

export function isMissingColumn(error) {
  if (!error) return false;
  if (error.code === "42703" || error.code === "PGRST204") return true;
  return /column .* does not exist|could not find the .* column/i.test(
    error.message ?? "",
  );
}

export function isMissingTable(error) {
  if (!error) return false;
  if (error.code === "42P01" || error.code === "PGRST205") return true;
  return /relation .* does not exist|could not find the table/i.test(
    error.message ?? "",
  );
}

/**
 * One loud, unambiguous line in the server log naming the migration to run.
 *
 * Deliberately not a silent degradation: the fallback keeps the site working,
 * but somebody has to know the database is behind the code, and a generic
 * "insert failed" would not tell them which file to run.
 */
export function warnMigrationMissing(migration, detail) {
  console.error(
    `[db-compat] Migration ${migration} has not been applied. ` +
      `Falling back so nothing is lost, but run it: supabase/migrations/${migration}. ` +
      `Underlying error: ${detail}`,
  );
}
