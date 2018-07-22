import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import Content, { HTMLContent } from "../components/Content";
import Comments from "../components/Comments";

export const BlogPostTemplate = ({
	content,
	contentComponent,
	description,
	tags,
	title,
	helmet,
	slug,
}) => {
	const PostContent = contentComponent || Content;

	return (
		<section className="section">
			{helmet || ""}
			<div className="container content">
				<div className="columns is-multiline is-centered">
					<div className="column is-8">
						<h1 className="title is-size-2 has-text-weight-bold is-bold-light Circular">
							{title}
						</h1>
						<p className="has-text-grey">{description}</p>
						<PostContent
							content={content}
							className="has-text-black"
						/>
						{tags && tags.length ? (
							<div style={{ marginTop: `4rem` }}>
								<h4 className="has-text-black Circular">
									Tags
								</h4>
								<ul className="taglist">
									{tags.map(tag => (
										<li key={tag + `tag`}>
											<Link
												to={`/tags/${kebabCase(tag)}/`}
											>
												{tag}
											</Link>
										</li>
									))}
								</ul>
							</div>
						) : null}
						<h4 className="has-text-black Circular">Comments</h4>
					</div>
					<div className="column is-7">
						<Comments slug={slug} />
					</div>
				</div>
			</div>
		</section>
	);
};

BlogPostTemplate.propTypes = {
	content: PropTypes.string.isRequired,
	contentComponent: PropTypes.func,
	description: PropTypes.string,
	title: PropTypes.string,
	// helmet: PropTypes.instanceOf(Helmet),
};

const BlogPost = ({ data }) => {
	const { markdownRemark: post } = data;

	return (
		<BlogPostTemplate
			content={post.html}
			contentComponent={HTMLContent}
			description={post.frontmatter.description}
			helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
			tags={post.frontmatter.tags}
			title={post.frontmatter.title}
			date={post.frontmatter.date}
			slug={post.fields.slug}
		/>
	);
};

BlogPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}),
};

export default BlogPost;

export const pageQuery = graphql`
	query BlogPostByID($id: String!) {
		markdownRemark(id: { eq: $id }) {
			id
			html
			fields {
				slug
			}
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				description
				tags
			}
		}
	}
`;
