import React from 'react';
import "./../Styles/Chat.css"

class Messages extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	}



	render() {
		return (
			<div className="container chat-container">
				<div className="messages__buyers">
					<input className="msg-buyer msg-buyer__search p-l-50" placeholder="search" />
					<span className="fa fa-search msg-buyer__sicon" aria-hidden="true"></span>

					<div  className="msg-buyer active">
						<div className="msg-buyer__logo"></div>

						<span className="msg-buyer__name">Buyer Name</span>
						<span className="msg-buyer__text">Raw denim you probably haven’t...</span>
						<span className="msg-buyer__time">09:08 AM</span>
					</div>

					<div  className="msg-buyer">
						<div className="msg-buyer__logo"></div>

						<span className="msg-buyer__name">Buyer Name</span>
						<span className="msg-buyer__text">Raw denim you probably haven’t...</span>
						<span className="msg-buyer__time">09:08 AM</span>
					</div>

					<div  className="msg-buyer">
						<div className="msg-buyer__logo"></div>

						<span className="msg-buyer__name">Buyer Name</span>
						<span className="msg-buyer__text">Raw denim you probably haven’t...</span>
						<span className="msg-buyer__time">09:08 AM</span>
					</div>

					<div  className="msg-buyer">
						<div className="msg-buyer__logo"></div>

						<span className="msg-buyer__name">Buyer Name</span>
						<span className="msg-buyer__text">Raw denim you probably haven’t...</span>
						<span className="msg-buyer__time">09:08 AM</span>
					</div>

					<div  className="msg-buyer">
						<div className="msg-buyer__logo"></div>

						<span className="msg-buyer__name">Buyer Name</span>
						<span className="msg-buyer__text">Raw denim you probably haven’t...</span>
						<span className="msg-buyer__time">09:08 AM</span>
					</div>

					<div  className="msg-buyer">
						<div className="msg-buyer__logo"></div>

						<span className="msg-buyer__name">Buyer Name</span>
						<span className="msg-buyer__text">Raw denim you probably haven’t...</span>
						<span className="msg-buyer__time">09:08 AM</span>
					</div>
				</div>

				<div className="messages__window">
					<header className="conv__header">
						<span>Buyer name</span>
						<span className="conv__lastseen">last seen today at 04:55 PM</span>
					</header>

					<main className="conv__msgs">
						<div className="conv__start">Yesteday</div>

						<div className="msg msg__my msg-first">
							Hi!
							<p className="msg-time">09:08 AM</p>
						</div>

						<div className="msg msg__my m-b-20">
							Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.
							<p className="msg-time">09:08 AM</p>
						</div>
						<div className="msg msg__my m-b-20">
							Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.
							<p className="msg-time">09:08 AM</p>
						</div>
						<div className="msg msg__my m-b-20">
							Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.
							<p className="msg-time">09:08 AM</p>
						</div>
						<div className="msg msg__my m-b-20">
							Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.
							<p className="msg-time">09:08 AM</p>
						</div>

						<div>
							<div className="msg_img"></div>
							<div className="msg-user-block">
								<div className="msg msg__user msg-first">
									Hi!
									<p className="msg-time">09:08 AM</p>
								</div>
								<div className="msg msg__user">
									Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.
									<p className="msg-time">09:08 AM</p>
								</div>
							</div>
						</div>
					</main>

					<footer className="conv__input">
						<input
							type="text"
							name="new_message"
							className="section__input newmsg-input"
							placeholder="typeMessage"
						/>

						<button
							type="button"
							name="button"
							className="newmsg-btn"
						>
							<img src="send.svg" alt="send" />
						</button>
					</footer>
				</div>
			</div>
		);
	}
}

export default Messages;