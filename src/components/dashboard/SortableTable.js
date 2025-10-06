"use client";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

function SortableRow({ item, renderRow }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="cursor-grab border border-border"
    >
      <td className="cursor-grab" {...attributes} {...listeners}>
        <GripVertical className="mx-auto text-secondarytext" />
      </td>
      {renderRow(item)}
    </tr>
  );
}

export default function SortableTable({
  items,
  renderRow,
  onReorder,
  columns,
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((c) => c.id === active.id);
    const newIndex = items.findIndex((c) => c.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex).map((c, idx) => ({
      ...c,
      order: idx + 1,
    }));

    onReorder(newItems);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <table className="w-full bg-card shadow rounded overflow-hidden mt-6">
          <thead className="bg-sidebar-primary text-maintext text-center border border-border">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="p-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-center border border-border">
            {items.map((item) => (
              <SortableRow key={item.id} item={item} renderRow={renderRow} />
            ))}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-secondarytext text-xl font-semibold"
                >
                  لا توجد بيانات بعد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </SortableContext>
    </DndContext>
  );
}
