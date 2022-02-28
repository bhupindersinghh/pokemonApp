import React from 'react'


const Description = ({heightpok,weightpok,pokstat1,pokstat2,pokstat3,posbs1,posbs2,posbs3}) => {
    return (
        <div className="desc">
            <p><b>Height</b> is <b>{heightpok*10} cm.</b></p>
            <p><b>Weight</b> is <b>{weightpok*0.1} kg</b></p>
            <h3>Stat</h3>
            <p><b>{pokstat1} : {posbs1}</b></p>
            <p><b>{pokstat2} : {posbs2}</b></p>
            <p><b>{pokstat3} : {posbs3}</b></p>
        </div>
    )
}

export default Description
