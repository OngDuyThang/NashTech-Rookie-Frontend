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
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type CartEntity = {
  __typename?: 'CartEntity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  items?: Maybe<Array<CartItemEntity>>;
  total: Scalars['Float']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user_id: Scalars['String']['output'];
};

export type CartItemEntity = {
  __typename?: 'CartItemEntity';
  cart_id: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  product?: Maybe<ProductSchema>;
  quantity: Scalars['Float']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
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
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateCartItemDto = {
  product_id: Scalars['String']['input'];
  quantity?: Scalars['Int']['input'];
};

export type CreateOrderDto = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  payment_method?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
};

export type CreateReviewDto = {
  description: Scalars['String']['input'];
  product_id: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreateTempItemDto = {
  product_id: Scalars['String']['input'];
  quantity?: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCartItem: CartItemEntity;
  createCartItemForGuest: TempItemEntity;
  createReview: ReviewEntity;
  deleteCartItem: Scalars['String']['output'];
  deleteCartItemForGuest: Scalars['String']['output'];
  placeOrder: TPaymentResponse;
  updateCartItem: Scalars['String']['output'];
  updateCartItemForGuest: Scalars['String']['output'];
  updatePaymentStatus: Scalars['String']['output'];
};


export type MutationCreateCartItemArgs = {
  item: CreateCartItemDto;
};


export type MutationCreateCartItemForGuestArgs = {
  guestId: Scalars['String']['input'];
  item: CreateTempItemDto;
};


export type MutationCreateReviewArgs = {
  review: CreateReviewDto;
};


export type MutationDeleteCartItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCartItemForGuestArgs = {
  id: Scalars['String']['input'];
};


export type MutationPlaceOrderArgs = {
  order: CreateOrderDto;
};


export type MutationUpdateCartItemArgs = {
  id: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};


export type MutationUpdateCartItemForGuestArgs = {
  id: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};


export type MutationUpdatePaymentStatusArgs = {
  orderId: Scalars['String']['input'];
  payment_status: Scalars['String']['input'];
};

export type OrderItemEntity = {
  __typename?: 'OrderItemEntity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  order_id: Scalars['String']['output'];
  product?: Maybe<ProductSchema>;
  quantity: Scalars['Float']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ProductEntity = {
  __typename?: 'ProductEntity';
  author?: Maybe<AuthorEntity>;
  author_id?: Maybe<Scalars['String']['output']>;
  category?: Maybe<CategoryEntity>;
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
  condition?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discount_percent: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  level?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  products?: Maybe<ProductList>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  value: Scalars['Float']['output'];
};


export type PromotionEntityProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  author: AuthorEntity;
  authors: Array<AuthorEntity>;
  cart: CartEntity;
  cartForGuest: TempCartEntity;
  categories: Array<CategoryEntity>;
  category: CategoryEntity;
  findOrderPromotion: Scalars['Float']['output'];
  getGuestCartCount: Scalars['Float']['output'];
  getUserCartCount: Scalars['Float']['output'];
  popularProducts: Array<ProductEntity>;
  product: ProductEntity;
  products: ProductList;
  promotion: PromotionEntity;
  promotionProducts: Array<ProductEntity>;
  promotions: Array<PromotionEntity>;
  query: Scalars['String']['output'];
  recommendProducts: Array<ProductEntity>;
  review: ReviewEntity;
  reviews: Array<ReviewEntity>;
  searchProducts: Array<ProductEntity>;
};


export type QueryAuthorArgs = {
  id: Scalars['String']['input'];
};


export type QueryCartForGuestArgs = {
  guestId: Scalars['String']['input'];
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindOrderPromotionArgs = {
  total: Scalars['Float']['input'];
};


export type QueryGetGuestCartCountArgs = {
  guestId: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  authorIds?: InputMaybe<Array<Scalars['String']['input']>>;
  categoryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  ratings?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  status?: Maybe<Scalars['String']['output']>;
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

export type TPaymentResponse = {
  __typename?: 'TPaymentResponse';
  clientSecret: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
};

export type TempCartEntity = {
  __typename?: 'TempCartEntity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  guest_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  items?: Maybe<Array<TempItemEntity>>;
  total: Scalars['Float']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type TempItemEntity = {
  __typename?: 'TempItemEntity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  product?: Maybe<ProductSchema>;
  product_id: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  temp_cart_id: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type AuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthorsQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'AuthorEntity', id: string, pen_name: string }> };

export type CreateCartItemMutationVariables = Exact<{
  item: CreateCartItemDto;
}>;


export type CreateCartItemMutation = { __typename?: 'Mutation', createCartItem: { __typename?: 'CartItemEntity', cart_id: string, created_at?: any | null, id: string, quantity: number, updated_at?: any | null, product?: { __typename?: 'ProductSchema', author?: string | null, created_at?: any | null, discount?: number | null, id: string, image?: string | null, price: number, title: string, updated_at?: any | null } | null } };

export type UpdateCartItemMutationVariables = Exact<{
  id: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
}>;


export type UpdateCartItemMutation = { __typename?: 'Mutation', updateCartItem: string };

export type DeleteCartItemMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCartItemMutation = { __typename?: 'Mutation', deleteCartItem: string };

export type GetUserCartCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCartCountQuery = { __typename?: 'Query', getUserCartCount: number };

export type CartQueryVariables = Exact<{ [key: string]: never; }>;


export type CartQuery = { __typename?: 'Query', cart: { __typename?: 'CartEntity', created_at?: any | null, id: string, updated_at?: any | null, user_id: string, items?: Array<{ __typename?: 'CartItemEntity', cart_id: string, created_at?: any | null, id: string, quantity: number, updated_at?: any | null, product?: { __typename?: 'ProductSchema', author?: string | null, created_at?: any | null, discount?: number | null, id: string, image?: string | null, price: number, title: string, updated_at?: any | null } | null }> | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'CategoryEntity', id: string, name: string, parent_id?: string | null, parent?: { __typename?: 'CategoryEntity', id: string, name: string, parent_id?: string | null } | null }> };

export type CreateOrderMutationVariables = Exact<{
  order: CreateOrderDto;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', placeOrder: { __typename?: 'TPaymentResponse', clientSecret: string, orderId: string } };

export type UpdatePaymentStatusMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
  payment_status: Scalars['String']['input'];
}>;


export type UpdatePaymentStatusMutation = { __typename?: 'Mutation', updatePaymentStatus: string };

export type PromotionProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type PromotionProductsQuery = { __typename?: 'Query', promotionProducts: Array<{ __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, author?: { __typename?: 'AuthorEntity', id: string, pen_name: string } | null, promotion?: { __typename?: 'PromotionEntity', description?: string | null, discount_percent: number, id: string, name: string } | null }> };

export type RecommendProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendProductsQuery = { __typename?: 'Query', recommendProducts: Array<{ __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, author?: { __typename?: 'AuthorEntity', id: string, pen_name: string } | null, promotion?: { __typename?: 'PromotionEntity', description?: string | null, discount_percent: number, id: string, name: string } | null }> };

export type PopularProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type PopularProductsQuery = { __typename?: 'Query', popularProducts: Array<{ __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, created_at?: any | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, updated_at?: any | null, author?: { __typename?: 'AuthorEntity', created_at?: any | null, id: string, pen_name: string, updated_at?: any | null } | null, promotion?: { __typename?: 'PromotionEntity', created_at?: any | null, description?: string | null, discount_percent: number, id: string, name: string, updated_at?: any | null } | null }> };

export type ProductsQueryVariables = Exact<{
  categoryIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  authorIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  ratings?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductList', limit?: number | null, page?: number | null, total?: number | null, data: Array<{ __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, created_at?: any | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, updated_at?: any | null, author?: { __typename?: 'AuthorEntity', created_at?: any | null, id: string, pen_name: string, updated_at?: any | null } | null, promotion?: { __typename?: 'PromotionEntity', created_at?: any | null, description?: string | null, discount_percent: number, id: string, name: string, updated_at?: any | null } | null }> } };

export type PromotionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PromotionsQuery = { __typename?: 'Query', promotions: Array<{ __typename?: 'PromotionEntity', created_at?: any | null, description?: string | null, discount_percent: number, id: string, name: string, updated_at?: any | null }> };

export type FindOrderPromotionQueryVariables = Exact<{
  total: Scalars['Float']['input'];
}>;


export type FindOrderPromotionQuery = { __typename?: 'Query', findOrderPromotion: number };

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


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'ProductEntity', author_id?: string | null, category_id?: string | null, description?: string | null, id: string, image?: string | null, price: number, promotion_id?: string | null, rating?: number | null, ratings?: Array<number> | null, title: string, category?: { __typename?: 'CategoryEntity', id: string, name: string } | null, author?: { __typename?: 'AuthorEntity', id: string, pen_name: string } | null, promotion?: { __typename?: 'PromotionEntity', description?: string | null, discount_percent: number, id: string, name: string } | null, reviews?: { __typename?: 'ReviewList', limit?: number | null, page?: number | null, total?: number | null, data: Array<{ __typename?: 'ReviewEntity', created_at?: any | null, description: string, id: string, product_id: string, rating: number, title: string, user_id: string }> } | null } };


export const AuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}}]}}]} as unknown as DocumentNode<AuthorsQuery, AuthorsQueryVariables>;
export const CreateCartItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCartItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"item"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCartItemDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCartItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"item"},"value":{"kind":"Variable","name":{"kind":"Name","value":"item"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCartItemMutation, CreateCartItemMutationVariables>;
export const UpdateCartItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCartItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCartItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}}]}]}}]} as unknown as DocumentNode<UpdateCartItemMutation, UpdateCartItemMutationVariables>;
export const DeleteCartItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCartItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCartItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCartItemMutation, DeleteCartItemMutationVariables>;
export const GetUserCartCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserCartCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserCartCount"}}]}}]} as unknown as DocumentNode<GetUserCartCountQuery, GetUserCartCountQueryVariables>;
export const CartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CartQuery, CartQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parent_id"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parent_id"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdatePaymentStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePaymentStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payment_status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePaymentStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payment_status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payment_status"}}}]}]}}]} as unknown as DocumentNode<UpdatePaymentStatusMutation, UpdatePaymentStatusMutationVariables>;
export const PromotionProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PromotionProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promotionProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<PromotionProductsQuery, PromotionProductsQueryVariables>;
export const RecommendProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RecommendProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recommendProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RecommendProductsQuery, RecommendProductsQueryVariables>;
export const PopularProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PopularProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"popularProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<PopularProductsQuery, PopularProductsQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Products"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ratings"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"ratings"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ratings"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const PromotionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Promotions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"promotions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<PromotionsQuery, PromotionsQueryVariables>;
export const FindOrderPromotionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOrderPromotion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"total"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOrderPromotion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"total"},"value":{"kind":"Variable","name":{"kind":"Name","value":"total"}}}]}]}}]} as unknown as DocumentNode<FindOrderPromotionQuery, FindOrderPromotionQueryVariables>;
export const CreateReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"review"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateReviewDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"review"},"value":{"kind":"Variable","name":{"kind":"Name","value":"review"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]}}]} as unknown as DocumentNode<CreateReviewMutation, CreateReviewMutationVariables>;
export const ProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Product"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"star"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"promotion_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"ratings"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pen_name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"promotion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount_percent"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"star"},"value":{"kind":"Variable","name":{"kind":"Name","value":"star"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"product_id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProductQuery, ProductQueryVariables>;