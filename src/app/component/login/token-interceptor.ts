// import { Injectable } from "@angular/core";
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
// import { Observable, throwError } from "rxjs";
// import { catchError } from "rxjs/operators";
// import { Router } from "@angular/router";
// import { AuthService } from "./auth.service";
// import { ToastrService } from "ngx-toastr";

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(
//     private auth: AuthService,
//     private router: Router,
//     private toastr: ToastrService
//   ) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.auth.getToken();

//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log('Requisição com cabeçalho de autorização:', request); // Log para verificação
//     }

//     return next.handle(request).pipe(
//       catchError((error: any) => {
//         if (error.status === 403) {
//           this.auth.logout();
//           this.router.navigateByUrl("/login");
//           return throwError(error.message || error);
//         }

//         if (error.status === 401) {
//           this.auth.logout();
//           if (this.router.url !== '/login') {
//             this.toastr.error('Sessão Expirada, entre no sistema novamente.', 'Atenção!');
//           }
//           this.router.navigateByUrl("/login");
//           return throwError(error.message || error);
//         }

//         return throwError(error);
//       })
//     );
//   }
// }
