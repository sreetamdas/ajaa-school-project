import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;

		return (
			<React.Fragment>
				<section className="hero is-medium">
					<div className="hero-body">
						<div className="container has-text-centered">
							<div className="is-size-2 has-text-black Circular">
								Welcome to Dadhi Machha Gadia Nodal High School
								Forum!
							</div>
						</div>
					</div>
				</section>
				<section className="section">
					<div className="container is-widescreen">
						<div className="content">
							<h1 className="has-text-weight-bold is-size-2">
								Latest Posts
							</h1>
						</div>
						<div className="container-cssgrid">
							{posts.map(({ node: post }) => (
								<div
									// className="content"
									className="item"
									key={post.id}
								>
									<p className="title is-size-4">
										<Link
											className="has-text-primary"
											to={post.fields.slug}
										>
											{post.frontmatter.title}
										</Link>
										<span> &bull; </span>
										<small className="has-text-info">
											{post.frontmatter.date}
										</small>
									</p>
									<p>
										{post.excerpt}
										<br />
										<br />
										<Link
											className="button is-info is-rounded"
											to={post.fields.slug}
										>
											Keep Reading →
										</Link>
									</p>
								</div>
							))}
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array,
		}),
	}),
};

export const pageQuery = graphql`
	query IndexQuery {
		allMarkdownRemark(
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
		) {
			edges {
				node {
					excerpt(pruneLength: 400)
					id
					fields {
						slug
					}
					frontmatter {
						title
						templateKey
						date(formatString: "MMMM DD, YYYY")
					}
				}
			}
		}
	}
`;
