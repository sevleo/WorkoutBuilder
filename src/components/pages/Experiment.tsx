// React
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { closestCenter } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { DraggableItem } from "../experiment/dnd/DraggableItem";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { v4 as uuidv4 } from "uuid";
import { DragOverlay } from "@dnd-kit/core";

// DndKit
import { SortableItem } from "../experiment/dnd/SortableItem";
import { Item } from "../experiment/dnd/Item";

import Header from "../sections/Header";

function Experiment({
  isHamburgerMenu,
  setIsHamburgerMenu,
  location,
  setLocation,
}) {
  const [items1, setItems1] = useState([
    {
      id: uuidv4(),
      name: "A",
    },
    {
      id: uuidv4(),
      name: "B",
    },
    {
      id: uuidv4(),
      name: "C",
    },
    {
      id: uuidv4(),
      name: "D",
    },
  ]);
  const [items2, setItems2] = useState([
    {
      id: uuidv4(),
      name: "E",
    },
    {
      id: uuidv4(),
      name: "F",
    },
    {
      id: uuidv4(),
      name: "G",
    },
  ]);

  // Modifiers for DndContext
  const [modifiers, setModifiers] = useState([
    restrictToVerticalAxis,
    restrictToParentElement,
    restrictToWindowEdges,
  ]);

  // Tracks if the element from the right has been moved to the left
  const [isMoved, setIsMoved] = useState(false);
  const [movedItem, setMovedItem] = useState();
  const [, setActiveItem] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current !== undefined) {
      setModifiers([restrictToVerticalAxis]);
    } else {
      setModifiers([]);
      console.log(event);
      const newActiveItem = items2.find((item) => item.id === event.active.id);
      setActiveItem(newActiveItem);
    }
  }

  // function handleDragMove(event: DragMoveEvent) {
  //   console.log("Drag Move:");
  //   console.log(event);
  //   if (event.over && )
  // }

  function handleDragOver(event: DragOverEvent) {
    if (
      event.active.data.current === undefined &&
      event.over.data.current !== undefined &&
      event.over.data.current.sortable
    ) {
      console.log("Move!");
      const draggedItem = items2.find((item) => item.id === event.active.id);
      console.log(draggedItem);
      setItems1((prevItems) => [...prevItems, draggedItem]);
      setItems2((prevItems) =>
        prevItems.filter((item) => item.id !== draggedItem.id)
      );
      setIsMoved(true);
      setMovedItem(draggedItem);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log("Drag End:");
    console.log(event);

    // Conditional for draggable
    if (
      event.active.data.current !== undefined &&
      event.over.data.current !== undefined &&
      isMoved
    ) {
      console.log("Copy!");
      const draggedItemCopy = { ...movedItem };
      draggedItemCopy.id = uuidv4();
      setItems2((prevItems) => [...prevItems, draggedItemCopy]);
      setIsMoved(false);
    }

    // Conditional for sortable
    if (
      event.active.data.current !== undefined &&
      over &&
      active.id !== over.id
    ) {
      if (event.over.data.current.sortable.containerId === "items1") {
        setItems1((items1) => {
          const oldIndex = items1.findIndex((item) => item.id === active.id);
          const newIndex = items1.findIndex((item) => item.id === over.id);

          return arrayMove(items1, oldIndex, newIndex);
        });
      }
    }
  }

  // Another implementation of sortable

  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(["1", "2", "3"]);

  function handleDragStart2(event) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd2(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  return (
    <>
      <Header
        isHamburgerMenu={isHamburgerMenu}
        setIsHamburgerMenu={setIsHamburgerMenu}
        location={location}
        setLocation={setLocation}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart2}
        onDragEnd={handleDragEnd2}
      >
        <div className="pt-[60px]">
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id) => (
              <SortableItem key={id} id={id} />
            ))}
          </SortableContext>
        </div>
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </DndContext>
      <br />
      <br />
      <br />
      <br />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        modifiers={modifiers}
        // onDragMove={handleDragMove}
      >
        <div className="flex flex-row">
          <div className="ml-auto mr-1 flex min-h-80 w-80 flex-col bg-green-300">
            {/* <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              modifiers={modifiers}
              onDragMove={handleDragMove}
            > */}
            <SortableContext
              items={items1}
              strategy={verticalListSortingStrategy}
              id="items1"
            >
              {items1.map((item) => {
                return (
                  <DraggableItem key={item.id} item={item} type="sortable" />
                );
              })}
            </SortableContext>
            {/* </DndContext> */}
          </div>
          <div className="ml-1 mr-auto flex min-h-80 w-80 flex-col bg-green-300 ">
            {items2.map((item) => {
              return (
                <DraggableItem key={item.id} item={item} type="draggable" />
              );
            })}
          </div>
        </div>
        {/* <DragOverlay style={{ transformOrigin: "0 0 " }}>
          {activeItem ? (
            <DraggableItem item={activeItem} type="overlay" />
          ) : null}
        </DragOverlay> */}
      </DndContext>
      <div className=" h-[300px] w-[300px]"></div>
    </>
  );
}

export default Experiment;
