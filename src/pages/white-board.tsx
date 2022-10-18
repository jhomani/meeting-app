import React, {useState, MouseEvent, useRef, useEffect} from 'react';
import {Button} from '@components/index';
import {useStatus} from '@src/utils/custom-hook';

interface IInitalState {
  pressedMouse: bool;
  paper: CanvasRenderingContext2D;
}

const initialValues = {
  pressedMouse: false,
  paper: {} as CanvasRenderingContext2D,
}

interface IPoint {
  x: num,
  y: num,
}

interface IStrokes {
  color: str,
  size: num,
  points: IPoint[]
}

let strokes: IStrokes[] = [];

const DessertFormContainer = () => {
  const [state, setState] = useStatus<IInitalState>(initialValues);
  const canvas = useRef<HTMLCanvasElement>(null);

  let axisX = 0, axisY = 0, pressedMouse = false;


  const startDrawing = (event: MouseEvent) => {
    pressedMouse = true;

    const target = event.target as HTMLCanvasElement;

    axisX = event.pageX - target.offsetLeft;
    axisY = event.pageY - target.offsetTop;

    strokes.push({
      color: '#0f0',
      size: 2,
      points: [{x: axisX, y: axisY}],
    });
  }

  const drawLine = (event: MouseEvent) => {
    if (pressedMouse) {
      const target = event.target as HTMLCanvasElement;

      const x = event.pageX - target.offsetLeft;
      const y  = event.pageY - target.offsetTop;

      drawingLine(x, y);

      const currentStroke = strokes[strokes.length - 1];
      currentStroke.points.push({x,y})

      axisX = x;
      axisY = y;
    }
  }

  useEffect(() => {
    const square = canvas.current as HTMLCanvasElement;
    const paper = square.getContext("2d")!;
    paper.lineCap = 'round';

    setState({paper});
  }, [])

  const stopDrawing = () => {
    setState({pressedMouse: false});
    pressedMouse = false;
  }

  const drawingLine = (xEnd: num, yEnd: num) => {
    state.paper.beginPath();
    state.paper.strokeStyle = '#000';
    state.paper.lineWidth = 2;
    state.paper.moveTo(axisX, axisY);
    state.paper.lineTo(xEnd,yEnd);
    state.paper.stroke();
    state.paper.closePath();
  }

  const handleSave = () => {
    localStorage.setItem('canvas_strokes', JSON.stringify(strokes));
  }

  const handleClear = () => {
    state.paper.clearRect(0, 0, canvas.current!.width, canvas.current!.height);
  }

  const handleRestore = () => {
    if(localStorage.getItem('canvas_strokes')) {
      strokes = JSON.parse(localStorage.getItem('canvas_strokes')!);
      redraw();
    }
  }

  const redraw = () => {
    state.paper.clearRect(0, 0, canvas.current!.width, canvas.current!.height);

    state.paper.lineCap = 'round';

    for (var i = 0; i < strokes.length; i++) {
      var s =strokes[i];
      state.paper.strokeStyle = s.color;
      state.paper.lineWidth = s.size;
      state.paper.beginPath();
      state.paper.moveTo(s.points[0].x, s.points[0].y);

      for (var j = 0; j < s.points.length; j++){
        var p = s.points[j];
        state.paper.lineTo(p.x, p.y);
      }

      state.paper.stroke();
    }
}

  return (
    <>
      <Button onPress={handleSave}>
        Save
      </Button>
      <Button onPress={handleClear}>
        Clear
      </Button>
      <Button onPress={handleRestore}>
        Restore
      </Button>
      <canvas
        width="500"
        height="500"
        id="drawPlace"
        ref={canvas}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={drawLine}
        style={{border:'1px solid #eee', backgroundColor: '#fff', cursor: 'crosshair'}}
      ></canvas>
    </>
  );
};

export default DessertFormContainer;

