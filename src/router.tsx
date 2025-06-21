import React from 'react'
import {createBrowserRouter, Navigate} from 'react-router'
import {Layout} from './components/layout/Layout'
import {Post} from './pages/Post'
import {SignIn} from './pages/SignIn'
import {SignUp} from './pages/SignUp'
import {AllPosts} from './pages/AllPosts'
import {FavoritePosts} from './pages/FavoritePosts'
import {PostsSearch} from './pages/PostsSearch'

import type {RouteObject} from 'react-router'
import {Activation} from './pages/Activation'
import {ActivationSuccess} from './pages/ActivationSuccess'
import {SignUpConfirmation} from './pages/SignUpConfirmation'
import {NewPost} from './pages/NewPost'
import {MyPosts} from './pages/MyPosts'

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/posts/all/1" />,
      },
      {
        path: '/posts',
        children: [
          {path: '/posts/all/:currentPage', element: <AllPosts />},
          {path: '/posts/favorites', element: <FavoritePosts />},
          {path: '/posts/search/:query/:currentPage', element: <PostsSearch />},
          {path: '/posts/:id', element: <Post />},
          {path: '/posts/new', element: <NewPost />},
          {path: '/posts/my-posts/:currentPage', element: <MyPosts />},
        ],
      },

      {
        path: '/auth/sign-in',
        element: <SignIn />,
      },
      {
        path: '/auth/sign-up',
        element: <SignUp />,
      },
      {
        path: '/auth/sign-up-confirmation',
        element: <SignUpConfirmation />,
      },
      {
        path: '/auth/activation/:uid/:token',
        element: <Activation />,
      },
      {
        path: '/auth/activation/success',
        element: <ActivationSuccess />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes, {
  basename: '/blog-demo',
})
