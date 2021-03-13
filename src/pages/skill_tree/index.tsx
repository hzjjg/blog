import React, { useState, useEffect, useRef } from "react"
import throttle from "lodash.throttle"
import "./skill_tree.scss"
import SpaceShip from '../../components/SpaceShip'

export default function SkillTreePage() {
  const [centerX, centerY] = typeof window !== `undefined` ? [window.innerWidth / 2, window.innerHeight / 2] : []

  const [bgStyle, setBgStyle] = useState({})
  const [bgCoverStyle, setBgCoverStyle] = useState({})
  const shipRef = useRef(null)

  useEffect(() => {
    shipRef.current.flyTo([500, 500])
  }, [])

  const handleMouseMove = throttle((e) => {
    const { pageX, pageY } = e
    moveBg(pageX, pageY)
    shipRef.current.flyTo([pageX, pageY])
    console.log(shipRef.current);
  }, 1000)

  function moveBg(pageX, pageY) {
    /** 以画面中心为原点的坐标 */
    const [x, y] = [pageX - centerX, pageY - centerY]

    setBgStyle({ transform: `translate(${x / 40}px,${y / 40}px)` })
    setBgCoverStyle({ transform: `translate(${-x / 20}px,${-y / 20}px)` })
  }

  return (
    <main className="SkillTreePage" onMouseMove={handleMouseMove as any}>
      <title>技能树</title>
      <SpaceShip ref={shipRef}></SpaceShip>
      <div className="bg" style={bgStyle}></div>
      <div className="bg-cover" style={bgCoverStyle}></div>
    </main>
  )
}