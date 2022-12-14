# Shoply

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2.

## Development server

Run `yarn dev` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Architecture

- **codedeploy** - Responsible for deployment process. Ignored by eslint.
- **dist** - build folder
- **node_modules** - project dependencies
- **src** - work directory
  - **app**
  - **assets** - General assets. Like styles, fonts, images, etc.
    - **components** - Components grouped by their usage. For example `components/base/hello-world`
      , `components/home/home-page`,
      `components/navigation`, etc.
    - **guards** - Route Guards
    - **directives** - Contain custom directives _(create folder if not exists)_.
    - **pipes** - Contain custom pipes _(create folder if not exists)_.
    - **layouts** - Contain different page layouts.
    - **mixins** - Vue reusable mixins if they are used across multiple components _(create folder if not exists)_.
    - **pages** - Contain pages with angular router integration. Each component/module added to this folder will used
      for router.
      - for simple routes like `/login`, `/about` - we should create a standalone component (only if we use angular 13+)
      - for nested routes like `/products`, `/products/create`, `/products/:id/edit` we should create a module and group
        them into this module routes
    - **services** - Tools that do not depend on components or pages and can be used in any of the component or outside
      of them. Should provide an external API which if possible not tied to a specific technology or library.
    - **ts** - Typescript assets, such as an interfaces, types, enums etc.
    - **utils** - Contains helper functions whose task is to take a value, perform some kind of action with it and
      return a new value. At the same time, without producing any side effects.
  - **environments** - env variables
- **main.ts** - application entrypoint
- **styles.css** - styles entrypoint

## Router

At the root level we put our layout and as children put our pages
Example config standalone components only:

```ts
const routes: Routes = [
  {
    // our layout
    path: "auth",
    loadComponent: () =>
      import("@/layouts/auth/auth.component").then((m) => m.AuthComponent),
    children: [
      {
        // our page
        path: "login",
        loadComponent: () =>
          import("@/pages/login/login.component").then((m) => m.LoginComponent),
      },
    ],
  },
];
```

#### For modules

```ts
// router/base-rouding.module.ts
const routes: Routes = [
  {
    path: "",
    // lazy load standalone component
    loadComponent: () =>
      import("@/layouts/default/default.component").then(
        (m) => m.DefaultComponent
      ),
    children: [
      {
        path: "products",
        title: "Product List",
        // lazy load module
        loadChildren: () =>
          import("@/pages/products/products.module").then(
            (m) => m.ProductsModule
          ),
      },
    ],
  },
];
```

```ts
// pages/products.module.ts
const routes: Routes = [
  {
    path: "",
    component: ProductsListComponent,
  },
  {
    path: ":id",
    component: ProductComponent,
  },
];
```

## Styles

We use [Tailwind CSS](https://tailwindcss.com/).

We don't use any css extensions, only pure css with some postCss
plugins([postcss-import](https://github.com/postcss/postcss-import)
, [postcss-nesting](https://github.com/csstools/postcss-plugins)).

The [Tailwind config](https://tailwindcss.com/docs/configuration) is located in **tailwind.config.js** in the root
directory.

## Name convention:

- **File, folders names** - kebab-case
  example: `home, chat-components, home-page.component.ts, base.module.ts, auth.service.ts`
- **Component selector** - PascalCase, example: `HelloWorld`, `MainMenu`
- **Directive selector** - cameCase, example: `@Directive({ selector: '[clickOutside]', })`
- **Pipe selector** - cameCase, example: `@Pipe({ name: 'fileSize' })`
- **Class, interface, enum name** - PascalCase `class User {}`, `enum SocketEvents {}, interface UserInterface {}`
- **constants** - snake upper case, example: `cosnt JWT_SECRET = ''`, `const AUTHORIZATION_HEADER_KEY = ''`
- **Methods** - camelCase, example: `getUserRole() {}`, `updateUser() {}`

## Forms

// html file

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <label for="first-name">First Name: </label>
  <input id="first-name" type="text" formControlName="firstName" />

  <label for="last-name">Last Name: </label>
  <input id="last-name" type="text" formControlName="lastName" />
</form>
```

// ts file

```ts
@Component({
  selector: `LoginComponent`,
})
class LoginComponent {
  form = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
  });

  onSubmit(): void {
    // mark all fields as touched and validate them
    this.form.markAllAsTouched();

    if (!this.form.invalid) {
      // do something if the form is valid
      console.log(this.form.value, "form value");
    }
  }
}
```

#### Get field errors

```ts
class LoginComponent {
  // --//--

  showFormErros() {
    const firstNameErrors = this.form.controls.firstName.errors;
    const lastNameErrors = this.form.controls.lastName.errors;

    // do something with errors
  }
}
```

## Event handler

```html
<!-- filter.component.html -->
<input type="text" #priceFilter placeholder="Min" />
```

```ts
// filter.component.ts
export class FilterComponent {
  @ViewChild("priceFilter") priceFilterElement!: ElementRef;

  ngAfterViewInit(): void {
    // we can use anothoer input event instead of input
    fromEvent(this.priceFilterElement.nativeElement, "input").subscribe(
      ({ target: { value } }: any) => {
        // do something with value
      }
    );
  }
}
```

## Http requests

```ts
// auth.service.ts
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: LoginInterface): Observable<CredentialsInterface> {
    // use enum for api routes
    return this.http.post<CredentialsInterface>(ApiRoutes.Login, payload);
  }
}
```

#### use into component

```ts
// login.component.ts
@Component({
  selector: "Login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login({}).subscribe({
      next: (response) => {
        // do something with response
      },
      error: (error) => {
        // do something with error
      },
    });
  }
}
```

### Parallel requests

```ts
import { HttpClient } from "@angular/common/http";

class HomeComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin([this.http.get("<urlOne>"), this.http.get("<urlTwo>"), ,]).subscribe({
      next: ([responseOne, responseTwo]) => {
        console.log(responseOne, responseTwo);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
```
