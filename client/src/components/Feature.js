import cafemanagment from "../Images/cafemanagment.png";
import Customer from "../Images/Customer.jpeg";
import Easymanagment from "../Images/Easymanagment.png";
import flexible from "../Images/flexible.jpeg";
import "./feature.css";
const Feature = () => {
	return (
		<div>
			<div className="cards-list">
				<div className="card 1">
					<div className="card_image"> <img src={cafemanagment} /> </div>
					<div className="card_title title-black">
						<p>Cafeteria Inventory Management</p>
					</div>
				</div>

				<div className="card 2">
					<div className="card_image">
						<img className="img" src={Customer} />
					</div>
					<div className="card_title title-black">
						<p>Customer Relationship <br /> System</p>
					</div>
				</div>

				<div className="card 3">
					<div className="card_image">
						<img src={Easymanagment} />
					</div>
					<div className="card_title">
						<p>Easy Management</p>
					</div>
				</div>

				<div className="card 4">
					<div className="card_image">
						<img src={flexible} />
					</div>
					<div className="card_title title-black">
						<p>Flexible</p>
					</div>
				</div>
			</div>
		</div>

	)
}
export default Feature;