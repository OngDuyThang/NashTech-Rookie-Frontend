/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AuthorEntity = {
  __typename?: 'AuthorEntity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  pen_name: Scalars['String']['output'];
  products?: Maybe<ProductList>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};


export type AuthorEntityProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type CartItemSchema = {
  __typename?: 'CartItemSchema';
  cart_id: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  product?: Maybe<ProductSchema>;
  quantity?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<CategoryEntity>;
  parent_id?: Maybe<Scalars['String']['output']>;
  products?: Maybe<ProductList>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};


export type CategoryEntityProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type CreateReviewDto = {
  description: Scalars['String']['input'];
  product_id: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createReview: ReviewEntity;
};


export type MutationCreateReviewArgs = {
  review: CreateReviewDto;
};

export type ProductEntity = {
  __typename?: 'ProductEntity';
  author?: Maybe<AuthorEntity>;
  author_id?: Maybe<Scalars['String']['output']>;
  category_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  promotion?: Maybe<PromotionEntity>;
  promotion_id?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Array<Scalars['Float']['output']>>;
  reviews?: Maybe<ReviewList>;
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};


export type ProductEntityReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  star?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductList = {
  __typename?: 'ProductList';
  data: Array<ProductEntity>;
  limit?: Maybe<Scalars['Float']['output']>;
  page?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type ProductSchema = {
  __typename?: 'ProductSchema';
  author?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type PromotionEntity = {
  __typename?: 'PromotionEntity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount_percent: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<ProductList>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};


export type PromotionEntityProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  author: AuthorEntity;
  authors: Array<AuthorEntity>;
  categories: Array<CategoryEntity>;
  category: CategoryEntity;
  product: ProductEntity;
  products: ProductList;
  productsByRating: ProductList;
  promotion: PromotionEntity;
  promotionProducts: Array<ProductEntity>;
  promotions: Array<PromotionEntity>;
  recommendProducts: Array<ProductEntity>;
  review: ReviewEntity;
  reviews: Array<ReviewEntity>;
  searchProducts: Array<ProductEntity>;
};


export type QueryAuthorArgs = {
  id: Scalars['String']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProductsByRatingArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPromotionArgs = {
  id: Scalars['String']['input'];
};


export type QueryReviewArgs = {
  id: Scalars['String']['input'];
};

export type ReviewEntity = {
  __typename?: 'ReviewEntity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  product_id: Scalars['String']['output'];
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user_id: Scalars['String']['output'];
};

export type ReviewList = {
  __typename?: 'ReviewList';
  data: Array<ReviewEntity>;
  limit?: Maybe<Scalars['Float']['output']>;
  page?: Maybe<Scalars['Float']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type AuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorsQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'AuthorEntity', id: string, pen_name: string }> };

export type AuthorQueryVariables = Exact<{
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type AuthorQuery = { __typename?: 'Query', author: { __typename?: 'AuthorEntity', id: string, pen_name: string, products?: { __typename?: 'ProductList', limit?: number | null, page?: number | null, total?: number | null, data: Array<{ __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, author?: { __typename?: 'AuthorEntity', id: string, pen_name: string } | null, promotion?: { __typename?: 'PromotionEntity', description?: string | null, discount_percent: number, id: string, name: string } | null }> } | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'CategoryEntity', id: string, name: string, parent_id?: string | null, parent?: { __typename?: 'CategoryEntity', id: string, name: string, parent_id?: string | null } | null }> };

export type CategoryQueryVariables = Exact<{
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type CategoryQuery = { __typename?: 'Query', category: { __typename?: 'CategoryEntity', id: string, name: string, parent_id?: string | null, products?: { __typename?: 'ProductList', limit?: number | null, page?: number | null, total?: number | null, data: Array<{ __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, author?: { __typename?: 'AuthorEntity', id: string, pen_name: string } | null, promotion?: { __typename?: 'PromotionEntity', description?: string | null, discount_percent: number, id: string, name: string } | null }> } | null } };

export type PromotionProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type PromotionProductsQuery = { __typename?: 'Query', promotionProducts: Array<{ __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, author?: { __typename?: 'AuthorEntity', id: string, pen_name: string } | null, promotion?: { __typename?: 'PromotionEntity', description?: string | null, discount_percent: number, id: string, name: string } | null }> };

export type RecommendProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendProductsQuery = { __typename?: 'Query', recommendProducts: Array<{ __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, author?: { __typename?: 'AuthorEntity', id: string, pen_name: string } | null, promotion?: { __typename?: 'PromotionEntity', description?: string | null, discount_percent: number, id: string, name: string } | null }> };

export type ProductsByRatingQueryVariables = Exact<{
  rating?: InputMaybe<Scalars['Float']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductsByRatingQuery = { __typename?: 'Query', productsByRating: { __typename?: 'ProductList', limit?: number | null, page?: number | null, total?: number | null, data: Array<{ __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, author?: { __typename?: 'AuthorEntity', id: string, pen_name: string } | null, promotion?: { __typename?: 'PromotionEntity', description?: string | null, discount_percent: number, id: string, name: string } | null }> } };

export type CreateReviewMutationVariables = Exact<{
  review: CreateReviewDto;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'ReviewEntity', created_at?: any | null, description: string, id: string, product_id: string, rating: number, title: string, updated_at?: any | null, user_id: string } };

export type ProductQueryVariables = Exact<{
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  star?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, author?: { __typename?: 'AuthorEntity', id: string, pen_name: string } | null, promotion?: { __typename?: 'PromotionEntity', description?: string | null, discount_percent: number, id: string, name: string } | null, reviews?: { __typename?: 'ReviewList', limit?: number | null, page?: number | null, total?: number | null, data: Array<{ __typename?: 'ReviewEntity', created_at?: any | null, description: string, id: string, product_id: string, rating: number, title: string, user_id: string }> } | null } };


export const AuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}}]}}]} as unknown as DocumentNode<AuthorsQuery, AuthorsQueryVariables>;
export const AuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Author"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AuthorQuery, AuthorQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parent_id"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parent_id"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Category"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parent_id"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CategoryQuery, CategoryQueryVariables>;
export const PromotionProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PromotionProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promotionProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<PromotionProductsQuery, PromotionProductsQueryVariables>;
export const RecommendProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecommendProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recommendProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RecommendProductsQuery, RecommendProductsQueryVariables>;
export const ProductsByRatingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductsByRating"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsByRating"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductsByRatingQuery, ProductsByRatingQueryVariables>;
export const CreateReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"review"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateReviewDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"review"},"value":{"kind":"Variable","name":{"kind":"Name","value":"review"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]}}]} as unknown as DocumentNode<CreateReviewMutation, CreateReviewMutationVariables>;
export const ProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Product"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"star"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"star"},"value":{"kind":"Variable","name":{"kind":"Name","value":"star"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;