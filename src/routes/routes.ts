import BuddyListPage from 'pages/buddy';
import AddBuddyPage from 'pages/buddy/add';
import BuddyPage from 'pages/buddy/detail';
import BuddyInvitationPage from 'pages/buddy/invitation';
import FavoritePage from 'pages/favorite';
import MyLinkPage from 'pages/link';
import AddLinkForm from 'pages/link/add';
import LinkDetailPage from 'pages/link/detail';
import LoginPage from 'pages/login';
import HomePage from 'pages/main';
import RecentViewPage from 'pages/recentview';
import RegistedPage from 'pages/registed';
import SearchPage from 'pages/search';
import TestPage from 'pages/test';
import UserPage from 'pages/user';
import UserEditPage from 'pages/user/edit';

export const routes = [
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/home',
    element: HomePage,
  },
  {
    path: '/my',
    element: MyLinkPage,
  },
  {
    path: '/buddy/:buddyId',
    element: BuddyPage,
  },
  {
    path: '/buddy/list',
    element: BuddyListPage,
  },
  {
    path: '/buddy/invitation',
    element: BuddyInvitationPage,
  },
  {
    path: '/user/:userId',
    element: UserPage,
  },
  {
    path: '/user/edit/my',
    element: UserEditPage,
  },
  {
    path: '/add-link',
    element: AddLinkForm,
  },
  {
    path: '/add-buddy',
    element: AddBuddyPage,
  },
  {
    path: '/login',
    element: LoginPage,
  },
  {
    path: '/search',
    element: SearchPage,
  },
  {
    path: '/favorite',
    element: FavoritePage,
  },
  {
    path: '/registed',
    element: RegistedPage,
  },
  {
    path: '/recent-view',
    element: RecentViewPage,
  },
  {
    path: '/test',
    element: TestPage,
  },
  {
    path: '/category/:categoryId',
    element: LinkDetailPage,
  },
];
