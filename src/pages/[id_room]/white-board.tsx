import React, {MouseEvent, useRef, useEffect} from 'react';
import {Button} from '@components/index';
import {useStatus} from '@src/utils/custom-hook';
import { useRouter } from 'next/router'
import io from 'socket.io-client';

let socket: any;

interface IInitalState {
  pressedMouse: bool;
  paper: CanvasRenderingContext2D;
  color: string;
}

const initialValues = {
  pressedMouse: false,
  paper: {} as CanvasRenderingContext2D,
  color: '#000',
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

const WhiteBoardPage = () => {
  const [state, setState] = useStatus<IInitalState>(initialValues);
  const canvas = useRef<HTMLCanvasElement>(null);
  const router = useRouter()
  const { id_room } = router.query

  let axisX = 0, axisY = 0, pressedMouse = false;


  const startDrawing = (event: MouseEvent) => {
    pressedMouse = true;

    const target = event.target as HTMLCanvasElement;
    const rects = target.getClientRects()[0];

    axisX = event.pageX - rects.left;
    axisY = event.pageY - rects.top;

    strokes.push({
      color: state.color,
      size: 2,
      points: [{x: axisX, y: axisY}],
    });
  }

  const drawLine = (event: MouseEvent) => {
    if (pressedMouse) {
      const target = event.target as HTMLCanvasElement;
      const rects = target.getClientRects()[0];

      const x = event.pageX - rects.left;
      const y  = event.pageY - rects.top;

      drawingLine(x, y);

      const currentStroke = strokes[strokes.length - 1];
      currentStroke.points.push({x,y})

      axisX = x;
      axisY = y;
    }
  }

  useEffect(() => {
    socketInitializer();

    const square = canvas.current as HTMLCanvasElement;
    const paper = square.getContext("2d")!; paper.lineCap = 'round';
    setState({paper});

    socket = io();

    socket.on(`${id_room}@draw`, (points: string) => {
      strokes = JSON.parse(points);
      redraw(paper);
    })
  }, [])

  const stopDrawing = () => {
    setState({pressedMouse: false});

    pressedMouse = false;

    socket.emit(`${id_room}@change`, JSON.stringify(strokes));
  }

  const drawingLine = (xEnd: num, yEnd: num) => {
    state.paper.beginPath();
    state.paper.strokeStyle = state.color;
    state.paper.lineWidth = 2;
    state.paper.moveTo(axisX, axisY);
    state.paper.lineTo(xEnd,yEnd);
    state.paper.stroke();
    state.paper.closePath();
  }

  const handleClear = () => {
    state.paper.clearRect(0, 0, canvas.current!.width, canvas.current!.height);
    socket.emit(`${id_room}@change`, '[]');
  }

  const redraw = (paper: CanvasRenderingContext2D) => {
    paper.clearRect(0, 0, canvas.current!.width, canvas.current!.height);

    paper.lineCap = 'round';

    for (var i = 0; i < strokes.length; i++) {
      var s =strokes[i];
      paper.strokeStyle = s.color;
      paper.lineWidth = s.size;
      paper.beginPath();
      paper.moveTo(s.points[0].x, s.points[0].y);

      for (var j = 0; j < s.points.length; j++){
        var p = s.points[j];
        paper.lineTo(p.x, p.y);
      }

      paper.stroke();
    }
  }

  const socketInitializer = async () => {
    await fetch('/api/socker-handler');

    socket = io();

    socket.on('connect', () => {
      console.log('connected from FRONT....');
    });
  };

  return (
    <div className='whiteboard'>
      <div className='button-group'>
        <Button onPress={handleClear}>
          Clear
        </Button>
      </div>

      <div className='canvas-continer'>
        <div className='color-buttons'>
          <Button className='red' onPress={() => setState({color:'#f00'})} />
          <Button className='blue' onPress={() => setState({color:'#00f'})} />
          <Button className='black' onPress={() => setState({color:'#000'})} />
          <Button className='green' onPress={() => setState({color:'#0f0'})} />
        </div>
        <canvas
          width="700"
          height="700"
          id="drawPlace"
          ref={canvas}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={drawLine}
          style={{border:'1px solid #eee', backgroundColor: '#fff', cursor: 'crosshair'}}
        ></canvas>

      </div>
    </div>
  );
};

export default WhiteBoardPage;

