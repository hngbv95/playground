import Konva from 'konva';
import { defer, delay, isEmpty, throttle } from 'lodash';

const { Stage, Layer } = Konva

const appId = "app"
const width = window.innerWidth
const height = window.innerHeight

interface IDirector {
  stage?: Konva.Stage,
  scenes: {
    menu?: Konva.Layer,
    board?: Konva.Layer
  }
};

class Director implements IDirector {
  stage: Konva.Stage;
  scenes: {
    menu?: Konva.Layer,
    board?: Konva.Layer
  }

  constructor(stage: Konva.Stage) {
    this.stage = stage
    this.scenes = {}
  }
}

const stage = new Stage({
  container: appId,   // id of container <div>
  width,
  height,
})

const director: Director = new Director(stage)

function center(child: Konva.Node, parent: Konva.Node, centerMode: 'both' | 'vertical' | 'horizonal' = 'both') {
  const { width : pWidth, height: pHeight } = parent.getClientRect();
  const { width : cWidth, height: cHeight, x: cx, y: cy } = child.getClientRect();

  let x = (pWidth - cWidth) /2 - cx
  let y = (pHeight - cHeight) /2 -cy

  if (centerMode !== 'both') {
    x = centerMode === 'vertical' ? x : child.x();
    y = centerMode === 'horizonal' ? y : child.y();
  }

  child.setPosition({x,y});
}

function newMenuButton(text: string): Konva.Group {
  const btnGroup = new Konva.Group();
  const btnText = new Konva.Text({
    text,
    fontSize: 200,
    fontFamily: 'Calibri',
    align: 'center',
    fill: '#555',
    padding: 10,
  });

  const btnBg = new Konva.Rect({
    width: btnText.getWidth(),
    height: btnText.getHeight(),
    fill: '#FFCF96',
    cornerRadius: 10,
  })

  btnGroup.add(btnBg)
  btnGroup.add(btnText)

  return btnGroup
}

function newDotItem(color: string = 'red'): Konva.Group {
  const group = new Konva.Group()

  const dot = new Konva.Circle({
    radius:10,
    fill: 'black'
  })
  const circleWall = new Konva.Circle({
    radius: 200,
  })

  group.add(circleWall)
  group.add(dot)

  return group
}

// init board game
function renderMenu() {
  let menu = director.scenes.menu
  const dots: Konva.Group[] = []
  if (isEmpty(menu)) {
    menu = new Layer()
    const bgLayer = new Konva.Rect({
      width, height,
      fill: '#FF8080'
    })

    const btn = newMenuButton("Board")
    const dot = newDotItem()
    const secdot = newDotItem('blue')
    menu.add(bgLayer)
    center(btn, menu);
    secdot.x(500)
    secdot.y(300)
    center(dot, menu)
    
    menu.add(btn)
    menu.add(dot)
    menu.add(secdot)
    dots.push(dot)
    dots.push(secdot)
  }

  const lineLayer = new Konva.Layer();
  const circleLayer = new Konva.Layer();
  director.stage.add(menu)
  director.stage.add(lineLayer)
  director.stage.add(circleLayer)

  let lines: Konva.Line[] = [];
  let radian = 300*300
  
  director.stage.on("pointermove", throttle(() => {
    const { x: a, y: b } = stage.getPointerPosition()!

    const c = a*a + b*b -radian;

    if (!isEmpty(lines)) {
      lines.forEach((line, i) => {
        line.destroy()
        delete lines[i]
      })
    }

    dots.forEach((dot) => {
      const x = dot.x()
      const y = dot.y()
      const val = x*x + y*y - 2*a*x-2*b*y+c 

      if (val <= 0) {
        const line = new Konva.Line({
          points: [x,y,a,b],
          stroke: 'black',
          strokeWidth: 1
        })

        lines.push(line);
        lineLayer.add(line)
      }
    })
  }, 15))

  const velocity = width / 9

  director.stage.on('mousedown touchstart', () => {
    const { x, y } = stage.getPointerPosition()!;
    const radius = Math.floor(Math.random() * width / 5)
    const circle = new Konva.Circle({
      x, y,
      radius: 0,
      stroke: 'black',
      strokeWidth: 0.5,
    })
    circleLayer.add(circle)

    const tween = new Konva.Tween({
      node: circle,
      duration: radius/velocity,
      radius,
      strokeWidth: 0
    }).play()

    delay(() => {
      circle.destroy()
      tween.destroy()
    }, radius/velocity * 1000)
  })
}


function init() {
  renderMenu()
}


init();

