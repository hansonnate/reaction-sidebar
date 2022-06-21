import React, { useState } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import {ChartBox} from './ChartBox';

export const SortableBox = (props) => {
  const sortable = useSortable({id: props.item});
  const {
    attributes,
    listeners,
    // isDragging,
    setNodeRef,
    transform,
    transition,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [currChartType, setCurrChartType] = useState(props.item.type);

  return (
    <ChartBox
      ref={setNodeRef}
      style={style}
      currType={currChartType}
      setType={setCurrChartType}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};
