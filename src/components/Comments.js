import React from "react";
import base from "./rebase";
import Comment from "./Comment";

class Comments extends React.Component {
	constructor(props) {
		super(props);

		this.handle_submit = this.handle_submit.bind(this);

		this.state = {
			comments: [],
			author: "",
			author_error: false,
		};
	}

	componentDidMount() {
		console.log("ID:", this.props.slug);
		this.ref = base.syncState(`comments${this.props.slug}`, {
			context: this,
			state: `comments`,
			then() {
				console.log("loaded");
			},
			catch() {
				console.log("error");
			},
		});

		const author = localStorage.getItem(`author`);
		if (author !== "") {
			console.log({ author });
			// this.setState({
			// 	author,
			// });
			this.author.value = author;
		}
	}

	handle_submit = () => {
		const date = new Date();
		const timestamp = `${date.getDate()} ${date.toLocaleDateString(
			{},
			{ month: "short" },
		)} ${date.getFullYear()} at ${date.toLocaleTimeString(
			{},
			{ hour: "2-digit", minute: "2-digit" },
		)}`;

		const comment = {
			body: this.comment.value,
			author: this.author.value,
			timestamp: timestamp,
		};
		if (this.author.value === "") {
			this.setState({
				author_error: true,
			});
		} else if (this.comment.value === "") {
		} else {
			this.setState({
				comments: [...this.state.comments, comment],
			});
			this.comment.value = "";
		}
	};

	save_name = () => {
		localStorage.setItem("author", this.author.value);
		this.setState({
			author: this.author.value,
			author_error: false,
		});
	};

	render() {
		return (
			<React.Fragment>
				<div className="comments">
					<Comment comments={this.state.comments} />
				</div>
				<div className="columns" style={{ paddingTop: "50px" }}>
					<div className="add-comment column is-12">
						<div className="field is-horizontal">
							<div className="field-label is-small">
								<label className="label">Commenting as</label>
							</div>
							<div className="field-body">
								<div className="field">
									<div className="control">
										<input
											className={`input add-author${
												this.state.author_error
													? " is-danger is-focused"
													: null
											}`}
											type="text"
											placeholder="Name"
											required
											ref={x => (this.author = x)}
											onChange={this.save_name}
										/>
									</div>
								</div>
							</div>
							<div className="field-label is-small">
								<label className="label">(Required)</label>
							</div>
						</div>
						<div className="field">
							<div className="control">
								<textarea
									className="textarea added-comment"
									placeholder="Add a comment"
									rows="4"
									required
									ref={x => (this.comment = x)}
								/>
							</div>
						</div>
						<div className="field">
							<div className="control">
								<button
									className="button is-info is-outlined"
									onClick={this.handle_submit}
								>
									Comment
								</button>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Comments;
