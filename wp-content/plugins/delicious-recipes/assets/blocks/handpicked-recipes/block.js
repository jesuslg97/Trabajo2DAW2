/**
 * BLOCK:
 */

import apiFetch from "@wordpress/api-fetch";
import { RecipeGrid } from "../common/RecipeGrid";
import { RecipeList } from "../common/RecipeList";
import icons from "../common/icons";
import Select from "react-select";

import { __ } from "@wordpress/i18n"; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Component, Fragment } = wp.element; // Import Componen and Fragment
const { InspectorControls } = wp.editor; // Import
const { PanelBody, TextControl, SelectControl } = wp.components; // Import Setting Controls

class Delicious_Recipes_Handpicked_Recipes extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			recipes: {},
			RecipeOptions: [],
			isLoading: false,
		};

		this.preventClick = this.preventClick.bind(this);
		this.doApiRecipesRequest = this.doApiRecipesRequest.bind(this);
		this.doApiRequest = this.doApiRequest.bind(this);
	}

	preventClick(e) {
		e.preventDefault();
		return false;
	}

	doApiRecipesRequest() {
		const { recipes, RecipeOptions, isLoading } = this.state;
		const { setAttributes } = this.props;

		apiFetch({
			url:
				delrcp.ajaxURL +
				"?action=delicious_recipes_handpicked_recipes_ajax",
		}).then((_terms) => {
			const { RecipeOptions } = _terms;

			this.setState({ RecipeOptions });
		});
	}

	doApiRequest(Recipe) {
		const { attributes, setAttributes } = this.props;
		const { recipes, isLoading } = this.state;

		if (Recipe == null) {
			Recipe = [];
		}
		Recipe = Recipe.map(function (Recipe) {
			return Recipe.value;
		}).join(",");

		this.setState({ isLoading: !isLoading });

		apiFetch({
			url:
				delrcp.ajaxURL +
				"?action=delicious_recipes_handpicked_recipes_block_ajax&posts_in=" +
				Recipe,
		}).then((_recipes) => {
			const { found, recipes } = _recipes;

			if (true === found) {
				this.setState({ recipes, isLoading: false });
			} else {
				this.setState({ recipes: {}, isLoading: false });
			}
		});
	}

	componentDidMount() {
		const { attributes } = this.props;
		const { Recipe } = attributes;

		this.doApiRecipesRequest();
		this.doApiRequest(Recipe);
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { Recipe } = this.props.attributes;

		if (Recipe !== nextProps.attributes.Recipe) {
			this.doApiRequest(nextProps.attributes.Recipe);
		}

		return true;
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { title, heading, layout, Recipe } = attributes;
		const { recipes, RecipeOptions, isLoading } = this.state;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__("Handpicked Recipes Settings", "delicious-recipes")}
					>
						<TextControl
							label={__("Title", "delicious-recipes")}
							value={title}
							onChange={(value) =>
								setAttributes({ title: value })
							}
						/>
						<SelectControl
							label={__("Heading", "delicious-recipes")}
							value={heading}
							options={[
								{ label: "H1", value: "h1" },
								{ label: "H2", value: "h2" },
								{ label: "H3", value: "h3" },
								{ label: "H4", value: "h4" },
								{ label: "H5", value: "h5" },
								{ label: "H6", value: "h6" },
								{ label: "Paragraph", value: "p" },
							]}
							onChange={(value) =>
								setAttributes({ heading: value })
							}
						/>
						<div className="components-base-control">
							<div className="components-base-control__field">
								<label className="components-base-control__label">
									{__("Recipes", "delicious-recipes")}
								</label>
								<Select
									label={__("Recipes", "delicious-recipes")}
									value={Recipe}
									options={RecipeOptions}
									isMulti="true"
									onChange={(value) =>
										setAttributes({ Recipe: value })
									}
								/>
							</div>
						</div>
						<SelectControl
							label={__("Layout", "delicious-recipes")}
							value={layout}
							options={[
								{ label: __("Grid View", "delicious-recipes"), value: "grid-view" },
								{ label: __("List View", "delicious-recipes"), value: "list-view" },
							]}
							onChange={(value) =>
								setAttributes({ layout: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
				{"h1" === heading && <h1 className="widget-title">{title}</h1>}
				{"h2" === heading && <h2 className="widget-title">{title}</h2>}
				{"h3" === heading && <h3 className="widget-title">{title}</h3>}
				{"h4" === heading && <h4 className="widget-title">{title}</h4>}
				{"h5" === heading && <h5 className="widget-title">{title}</h5>}
				{"h6" === heading && <h6 className="widget-title">{title}</h6>}
				{"p" === heading && <p className="widget-title">{title}</p>}
				{isLoading && (
					<span className="loading">{__("Loading...", "delicious-recipes")}</span>
				)}
				<div className="te-post-wrap-outer">
					{recipes.length > 0 &&
						recipes.map((recipe, index) =>
							"list-view" == layout ? (
								<RecipeList
									recipe={recipe}
									index={index}
									preventClick={this.preventClick}
								/>
							) : (
								<RecipeGrid
									recipe={recipe}
									index={index}
									preventClick={this.preventClick}
								/>
							)
						)}
				</div>
				{Object.entries(recipes).length < 1 ? __("Recipes not found.", "delicious-recipes") : ""}
			</Fragment>
		);
	}
}

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("delicious-recipes/handpicked-recipes", {
	title: __("Handpicked Recipes", "delicious-recipes"),
	description: __("A block to list the handpicked recipes.", "delicious-recipes"),
	icon: icons.handpicked,
	category: "delicious-recipes",
	keywords: [__("handpicked", "delicious-recipes"), __("delicious", "delicious-recipes"), __("recipes", "delicious-recipes")],
	attributes: {
		// default values
		title: {
			type: "string",
			default: __("Handpicked Recipes", "delicious-recipes"),
		},
		heading: {
			type: "string",
			default: "h2",
		},
		Recipe: {
			type: "array",
			default: [],
		},
		layout: {
			type: "string",
			default: "grid-view",
		},
	},
	example: {
		attributes: {
			content: __("Content of the block", "delicious-recipes"),
		},
		innerBlocks: [],
	},
	edit: Delicious_Recipes_Handpicked_Recipes,
	save: function ({ attributes }) {
		return null;
	},
}); // END Register GBSS Boxes Block
