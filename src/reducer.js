import {Map, toJS} from 'immutable';

const GRID_INITIAL_COLOR = '313131';

function createGrid(cellsCount, initialColor, createGamma) {
  let newGrid = [];

  if (createGamma) {
    // Create colors gamma
    for(var i = 0; i <= cellsCount ; i += 42) {
      let hex = ((0xe000|i).toString(16)).slice(1);
      newGrid.push({color: hex});
    }
  } else {
    //Set every cell with the initial color
    for (var i = 0; i < cellsCount; i++) {
      newGrid.push({color: initialColor, used: false});
    }
  }

  return newGrid;
}

function setInitialState(state, newState) {
  //Create initial grid
  let cellSize = 10,
      columns = 10,
      rows = 10,
      padding = 0.1,
      currentColor = '000',
      pixelGrid = createGrid(columns * rows, GRID_INITIAL_COLOR),
      paletteGrid = createGrid(4095, GRID_INITIAL_COLOR, true);

  let initialState = {
    grid: pixelGrid,
    paletteGridData: paletteGrid,
    cellSize: cellSize,
    columns: columns,
    rows: rows,
    padding: padding,
    currentColor: currentColor,
    initialColor: GRID_INITIAL_COLOR
  };

  return state.merge(initialState);
}

function setGridDimension(state, columns, rows, cellSize) {
  let newState = {
    grid: createGrid(columns * rows, GRID_INITIAL_COLOR),
    rows: parseInt(rows, 10),
    columns: parseInt(columns, 10),
    cellSize: parseInt(cellSize, 10)
  }

  return state.merge(newState);
}

function setColorSelected(state, newColorSelected) {
  let newState = {
    currentColor: newColorSelected
  }
  return state.merge(newState);
}

function setGridCellValue(state, color, used, id) {
  return state.setIn(['grid', parseInt(id, 10)], {
    color: color,
    used: used
  });
}

function setDrawing(state, grid, cellSize, columns, rows) {
  let newState = {
    grid: grid,
    cellSize: cellSize,
    columns: columns,
    rows: rows,
  };

  return state.merge(newState);
}

function setEraser(state) {
  let newState = {
    currentColor: null
  };

  return state.merge(newState);
}

function setCellSize(state, cellSize) {
  let newState = {
    cellSize: cellSize
  };

  return state.merge(newState);
}

function resetGrid(state, columns, rows) {
  let newState = {
    grid: createGrid(
      parseInt(columns, 10) * parseInt(rows, 10),
      GRID_INITIAL_COLOR
    )
  };

  return state.merge(newState);
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_INITIAL_STATE':
    return setInitialState(state, action.state);
  case 'SET_GRID_DIMENSION':
    return setGridDimension(state, action.columns, action.rows, action.cellSize);
  case 'SET_COLOR_SELECTED':
    return setColorSelected(state, action.newColorSelected);
  case 'SET_GRID_CELL_VALUE':
    return setGridCellValue(state, action.color, action.used, action.id);
  case 'SET_DRAWING':
    return setDrawing(state, action.grid, action.cellSize, action.columns, action.rows);
  case 'SET_ERASER':
    return setEraser(state);
  case 'SET_CELL_SIZE':
    return setCellSize(state, action.cellSize);
  case 'SET_RESET_GRID':
    return resetGrid(state, action.columns, action.rows);
  }
  return state;
}