import { Injectable, NgModule } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router, RouterModule } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStore, Store } from 'app/shared/model/store.model';
import { StoreService } from './store.service';
import { StoreComponent } from './store.component';
import { StoreDetailComponent } from './store-detail.component';
import { StoreUpdateComponent } from './store-update.component';

@Injectable({ providedIn: 'root' })
export class StoreResolve implements Resolve<IStore> {
  constructor(private service: StoreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStore> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((store: HttpResponse<Store>) => {
          if (store.body) {
            return of(store.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Store());
  }
}

export const storeRoute: Routes = [
  {
    path: '',
    component: StoreComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'equipmentManagementApp.store.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StoreDetailComponent,
    resolve: {
      store: StoreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equipmentManagementApp.store.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StoreUpdateComponent,
    resolve: {
      store: StoreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equipmentManagementApp.store.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StoreUpdateComponent,
    resolve: {
      store: StoreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equipmentManagementApp.store.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
@NgModule({
  imports: [RouterModule.forChild(storeRoute)],
  exports: [RouterModule],
})
export class StoreRoute {}
