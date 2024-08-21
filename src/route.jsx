import { Navigate, createBrowserRouter } from 'react-router-dom';
import HomePageLayout from './layout/HomePageLayout/HomePageLayout';
import HomePage from './pages/HomePage/HomePage';
import FilterPage from './pages/FilterPage/FilterPage';
import Accessories from './pages/Accessories/Accessories';
import ChoosePage from './pages/ChoosePage/ChoosePage';
import OverViewBike from './pages/OverViewBike/OverViewBike';
import Profile from './pages/Profile/Profile';
import DashboardLayout from './layout/DashboardLayout/DashboardLayout';
import DashBoardHome from './pages/DashBoardHome/DashBoardHome';
import Brand from './pages/Brand/Brand';
import Category from './pages/Category';
import AddBike from './pages/AddBike/AddBike';
import Bikes from './pages/Bikes/Bikes';
import AddCar from './pages/AddCar/AddCar';
import Cars from './pages/Cars/Cars';
import DashboardAccesories from './pages/DashboardAccesories/DashboardAccesories';
import DashboardParts from './pages/DashboardParts/DashboardParts';
import SearchPage from './pages/SearchPage/SearchPage';
import OverviewCar from './pages/OverviewCar/OverviewCar';
import OverviewAccessoriesAndParts from './pages/OverviewAccessoriesAndParts/OverviewAccessoriesAndParts';
import PopularBike from './pages/PopularBike/PopularBike';
import NewLaunchBike from './pages/NewLaunchBike/NewLaunchBike';
import DashboardBlogs from './pages/DashboardBlogs/DashboardBlogs';
import BlogPage from './pages/BlogPage/BlogPage';
import BlogDetailsPage from './pages/BlogDetailsPage/BlogDetailsPage';
import ContactDashboardPage from './pages/ContactDashboardPage/ContactDashboardPage';
import ContactPage from './pages/ContactPage/ContactPage';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import AdminProtectedRoute from './components/AdminProtectedRoute/AdminProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute/UserProtectedRoute';
import SellPage from './pages/SellPage/SellPage';
import UsedBikeDetailsPage from './pages/UsedBikeDetailsPage/UsedBikeDetailsPage';
import UsedBikePage from './pages/UsedBikePage/UsedBikePage';
import DashboardUsedPage from './pages/DashboardUsedPage/DashboardUsedPage';
import SelectCompare from './pages/SelectCompare/SelectCompare';
import ComparePage from './pages/ComparePage/ComparePage';
import useAxios from './Hooks/useAxios';

const route = () => {
    const axios = useAxios();
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePageLayout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />,
                },
                {
                    path: '/filter/:name',
                    element: <FilterPage />,
                },
                {
                    path: '/category/:type/:name',
                    element: <Accessories />,
                },
                {
                    path: '/overview/bike/:id',
                    element: <OverViewBike />,
                    loader: ({ params }) => axios.get(`/bike/${params.id}`)
                },
                {
                    path: '/overview/car/:id',
                    element: <OverviewCar />,
                },
                {
                    path: '/overview/:type/:id',
                    element: <OverviewAccessoriesAndParts />,
                },
                {
                    path: '/profile',
                    element: <UserProtectedRoute><Profile /></UserProtectedRoute>
                },
                {
                    path: '/blogs',
                    element: <BlogPage />
                },
                {
                    path: '/contact-us',
                    element: <ContactPage />
                },
                {
                    path: '/blog/:id',
                    element: <BlogDetailsPage />
                },
                {
                    path: '/forgot-password/:id',
                    element: <ForgotPassword />
                },
                {
                    path: '/most-popular',
                    element: <PopularBike />
                },
                {
                    path: '/new-launched',
                    element: <NewLaunchBike />
                },
                {
                    path: '/sell',
                    element: <SellPage />
                },
                {
                    path: '/used',
                    element: <UsedBikePage />
                },
                {
                    path: '/used/:id',
                    element: <UsedBikeDetailsPage />
                },
                {
                    path: '/compare',
                    element: <SelectCompare />
                },
                {
                    path: '/compare/:bike1/:bike2',
                    element: <ComparePage />
                },
                {
                    path: '/:type/:brand',
                    element: <SearchPage />
                },
                {
                    path: '/search/:type/:search',
                    element: <SearchPage />
                },
                {
                    path: '/search/:type',
                    element: <SearchPage />
                },
            ],
        },
        {
            path: '/dashboard',
            element: <AdminProtectedRoute><DashboardLayout /></AdminProtectedRoute>,
            children: [
                {
                    path: '/dashboard',
                    element: <Navigate to="/dashboard/home" />,
                },
                {
                    path: '/dashboard/home',
                    element: <DashBoardHome />,
                },
                {
                    path: '/dashboard/brand',
                    element: <Brand />,
                },
                {
                    path: '/dashboard/category',
                    element: <Category />,
                },
                {
                    path: '/dashboard/add-bike',
                    element: <AddBike />,
                },
                {
                    path: '/dashboard/bikes',
                    element: <Bikes />,
                },
                {
                    path: '/dashboard/add-car',
                    element: <AddCar />,
                },
                {
                    path: '/dashboard/cars',
                    element: <Cars />,
                },
                {
                    path: '/dashboard/accessories',
                    element: <DashboardAccesories />,
                },
                {
                    path: '/dashboard/parts',
                    element: <DashboardParts />,
                },
                {
                    path: '/dashboard/blogs',
                    element: <DashboardBlogs />,
                },
                {
                    path: '/dashboard/contact',
                    element: <ContactDashboardPage />,
                },
                {
                    path: '/dashboard/used',
                    element: <DashboardUsedPage />,
                },
            ]
        }
    ]);

    return router;
};

export default route;