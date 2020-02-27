import {ProviderComponent} from './pages/provider/provider.component';
import {FavoritesComponent} from './pages/favorites/favorites.component';

export const STMS_ROUTES = [
    {
        path: '',
        //  canActivate: [AuthenticationGuard],
        children: [
            {
                path: '',
                redirectTo: '/provider',
                pathMatch: 'full'
            },
            {
                path: 'provider',
                component: ProviderComponent,
                data: {
                    state: 'documentArchive',
                    menuState: 'documentArchive'
                }
            },
            {
                path: 'favorites',
                component: FavoritesComponent,
                data: {
                    state: 'documentArchive',
                    menuState: 'documentArchive'
                }
            }
        ]
    }
];
