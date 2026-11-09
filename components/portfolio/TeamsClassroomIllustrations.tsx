import Image from "next/image"
import person from "@/public/images/teams/classroom/person-avatar.png"
import headset from "@/public/images/teams/classroom/headset.png"
import sophia from "@/public/images/teams/classroom/sophia.png"
import boy from "@/public/images/teams/classroom/boy-avatar.png"
import unicorn from "@/public/images/teams/classroom/unicorn.png"
import sheri from "@/public/images/teams/classroom/sheri.png"
import nathan from "@/public/images/teams/classroom/nathan.png"
import robot from "@/public/images/teams/classroom/robot.png"
import avocado from "@/public/images/teams/classroom/avocado.png"
import dylan from "@/public/images/teams/classroom/dylan.png"
import ghost from "@/public/images/teams/classroom/ghost.png"
import lilly from "@/public/images/teams/classroom/lilly.png"
import smile from "@/public/images/teams/classroom/smile.png"
import heart from "@/public/images/teams/classroom/heart.png"
import clap from "@/public/images/teams/classroom/clap.png"
import hand from "@/public/images/teams/classroom/hand.png"
import grid from "@/public/images/teams/classroom/class-grid.png"

const firstRow = [person, headset, sophia, boy, unicorn, sheri]
const secondRow = [nathan, robot, avocado, dylan, ghost, lilly]
const reactions = [
  { image: smile, position: "smile-left" },
  { image: clap, position: "clap-right" },
  { image: heart, position: "heart-top" },
  { image: heart, position: "heart-left" },
  { image: clap, position: "clap-left" },
  { image: smile, position: "smile-right" },
  { image: hand, position: "hand-bottom" },
] as const

export function TeamsClassroomCover() {
  return <figure className="pf-media pf-teams-cover" aria-labelledby="teams-cover-title">
    <div className="pf-teams-cover-scene">
      <Image className="pf-teams-cover-grid" src={grid} alt="" sizes="90vw" />
      <div className="pf-teams-class-roster" role="img" aria-label="Classroom concept with thirteen student portraits and personalized avatars arranged in two rows.">
        <div className="pf-teams-avatar-row" aria-hidden="true">
          {firstRow.map((image, index) => <span className={`pf-teams-avatar ${index === 1 ? "pf-teams-avatar-headset" : ""}`} key={image.src}>
            <Image src={image} alt="" sizes="(max-width: 600px) 40px, 72px" />
          </span>)}
          <span className="pf-teams-avatar pf-teams-avatar-initials"><span>JH</span></span>
        </div>
        <div className="pf-teams-avatar-row" aria-hidden="true">
          {secondRow.map(image => <span className="pf-teams-avatar" key={image.src}>
            <Image src={image} alt="" sizes="(max-width: 600px) 40px, 72px" />
          </span>)}
        </div>
      </div>
      <h3 id="teams-cover-title">From a call<br />to a classroom.</h3>
      <div className="pf-teams-reactions" aria-hidden="true">
        {reactions.map(({ image, position }) => <Image className={`pf-teams-reaction pf-teams-reaction-${position}`} src={image} alt="" key={position} sizes="(max-width: 600px) 48px, 120px" />)}
      </div>
    </div>
  </figure>
}
