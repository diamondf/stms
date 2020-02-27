import {Provider} from '../../../services/provider.config';

export class FavoritesItem {
    id: number;
    name: string;
    provider: Provider;
    comment: string;
}
