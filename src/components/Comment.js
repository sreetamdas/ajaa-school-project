import React from "react";
import Markdown from "react-remarkable";
export default class Comment extends React.Component {
	render_comment = (comment, key) => {
		return (
			<div className="comment" key={key}>
				<p>
					<span className="has-text-black has-text-weight-semibold">
						{comment.author}
					</span>
					&nbsp;
					<span className="">
						<small className="is-size-7">commented on</small>
						&nbsp;
						<small className="has-text-info is-size-7">
							{comment.timestamp}
						</small>
					</span>
				</p>
				<Markdown source={comment.body} />
			</div>
		);
	};

	render() {
		let comments = this.props.comments;
		const empty = Object.keys(comments).length === 0 ? true : false;

		return (
			<React.Fragment>
				{!empty ? (
					Object.keys(comments).map(key =>
						this.render_comment(comments[key], key),
					)
				) : (
					<div>No Comments Yet!</div>
				)}
			</React.Fragment>
		);
	}
}
