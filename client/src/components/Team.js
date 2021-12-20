import noprofile from "../Images/noprofile.jpeg"
import React from "react";
import "./feature.css";
const Team = () => {
	return (
		<div>
			<div className="cards-list">
				<div className="card 1">
					<div className="card_image"> <img src={noprofile} /> </div>
					<div className="card_title title-black">
						<p>Kavisha Patel</p>
					</div>
				</div>

				<div className="card 2">
					<div className="card_image">
						<img className="img" src={noprofile} />
					</div>
					<div className="card_title title-black">
						<p>Jeel Damor</p>
					</div>
				</div>

				<div className="card 3">
					<div className="card_image">
						<img src={noprofile} />
					</div>
					<div className="card_title">
						<p>Kharadi Alay</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Team;