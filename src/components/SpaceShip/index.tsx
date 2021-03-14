import React from "react"
import "./space_ship.scss"

type State = {
    pos: number[],
    flying: boolean,
    posStyle: Record<string, string>,
    flameStyle: Record<string, string>,
}

class SpaceShip extends React.Component<{}, State> {

    speed = [0, 0]
    targetPos = [0, 0]
    maxSpeed = 100
    acc = 50
    lastFrameTime = 0
    flying = false

    constructor(props) {
        super(props);

        this.state = {
            pos: [0, 0],
            flying: false,
            posStyle: {},
            flameStyle: {},
        }
    }

    flyTo(pos) {
        this.targetPos = pos

        if (this.flying) return

        this.flying = true
        this.lastFrameTime = Date.now()
        window.requestAnimationFrame(this.updatePos)
    }

    turnTowards([x, y]) {

    }

    updatePos = () => {
        const [curX, curY] = [this.state.pos[0], this.state.pos[1]]
        const [restX, restY] = [this.targetPos[0] - curX, this.targetPos[1] - curY]
        const restDistance = Math.sqrt(Math.pow(restX, 2) + Math.pow(restY, 2))

        // if (restDistance < 4) {
        //     this.flying = false
        //     return
        // }

        const maxSpeedX = this.maxSpeed * restX / restDistance
        const maxSpeedY = this.maxSpeed * restY / restDistance

        const deltaTime = Date.now() - this.lastFrameTime
        this.lastFrameTime = Date.now()
        const delta = deltaTime / 1000

        const [curSpeedX, curSpeedY] = this.speed

        if (maxSpeedX >= 0 ? maxSpeedX > curSpeedX : maxSpeedX < curSpeedX) {
            this.speed[0] = curSpeedX + this.acc * delta * restX / restDistance
        }

        if (maxSpeedY >= 0 ? maxSpeedY > curSpeedY : maxSpeedY < curSpeedY) {
            this.speed[1] = curSpeedY + this.acc * delta * restY / restDistance
        }

        const [nextX, nextY] = [curX + this.speed[0] * delta, curY + this.speed[1] * delta]

        this.setState({
            pos: [nextX, nextY]
        })

        this.setState({
            posStyle: {
                transform: `translate(${nextX - 120}px,${nextY - 11}px)`
            },
            flameStyle: {
                transform: `scaleX(${Math.min(2.5, Math.max(0.5, Math.abs(this.speed[0] / this.maxSpeed * 2)))})`
            }
        })

        // setTimeout(() => {
        //     this.updatePos()
        // }, 1000);
        window.requestAnimationFrame(this.updatePos)
    }

    render() {
        return (
            <div className="SpaceShip" style={this.state.posStyle}>
                <div className="SpaceShip__flame" style={this.state.flameStyle}></div>
            </div>
        )
    }
}

export default SpaceShip