'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">porfolio_nestjs documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e956107348041f11de569582ed4d01b4474959c95eca18d3d634c5e361d21cc68ddd7504cd6358b2ce3603310faad19f22f4449df784807443708c8a7d961074"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e956107348041f11de569582ed4d01b4474959c95eca18d3d634c5e361d21cc68ddd7504cd6358b2ce3603310faad19f22f4449df784807443708c8a7d961074"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e956107348041f11de569582ed4d01b4474959c95eca18d3d634c5e361d21cc68ddd7504cd6358b2ce3603310faad19f22f4449df784807443708c8a7d961074"' :
                                        'id="xs-injectables-links-module-AppModule-e956107348041f11de569582ed4d01b4474959c95eca18d3d634c5e361d21cc68ddd7504cd6358b2ce3603310faad19f22f4449df784807443708c8a7d961074"' }>
                                        <li class="link">
                                            <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataResponseInterceptor</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-5795910019bd55832e29e3e4a65b8d7142e040c0480a7b3f4dc8b02b45f71d10431cd1e5f847cae7399554d16caee087c1863713ab1cd5df0eeefc66b2a3c07e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5795910019bd55832e29e3e4a65b8d7142e040c0480a7b3f4dc8b02b45f71d10431cd1e5f847cae7399554d16caee087c1863713ab1cd5df0eeefc66b2a3c07e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5795910019bd55832e29e3e4a65b8d7142e040c0480a7b3f4dc8b02b45f71d10431cd1e5f847cae7399554d16caee087c1863713ab1cd5df0eeefc66b2a3c07e"' :
                                            'id="xs-controllers-links-module-AuthModule-5795910019bd55832e29e3e4a65b8d7142e040c0480a7b3f4dc8b02b45f71d10431cd1e5f847cae7399554d16caee087c1863713ab1cd5df0eeefc66b2a3c07e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5795910019bd55832e29e3e4a65b8d7142e040c0480a7b3f4dc8b02b45f71d10431cd1e5f847cae7399554d16caee087c1863713ab1cd5df0eeefc66b2a3c07e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5795910019bd55832e29e3e4a65b8d7142e040c0480a7b3f4dc8b02b45f71d10431cd1e5f847cae7399554d16caee087c1863713ab1cd5df0eeefc66b2a3c07e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5795910019bd55832e29e3e4a65b8d7142e040c0480a7b3f4dc8b02b45f71d10431cd1e5f847cae7399554d16caee087c1863713ab1cd5df0eeefc66b2a3c07e"' :
                                        'id="xs-injectables-links-module-AuthModule-5795910019bd55832e29e3e4a65b8d7142e040c0480a7b3f4dc8b02b45f71d10431cd1e5f847cae7399554d16caee087c1863713ab1cd5df0eeefc66b2a3c07e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BcryptService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BcryptService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTokensService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTokensService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokensService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokensService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SignInService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContactsModule.html" data-type="entity-link" >ContactsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ContactsModule-310d1648f44c070d613992ddf04e0cb14c39ba764249241026d0fb8f97556b61ebd3a884b7b31932296bea1239b040c54eb3b1a2224bad944b189ae8ec55ea36"' : 'data-bs-target="#xs-controllers-links-module-ContactsModule-310d1648f44c070d613992ddf04e0cb14c39ba764249241026d0fb8f97556b61ebd3a884b7b31932296bea1239b040c54eb3b1a2224bad944b189ae8ec55ea36"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ContactsModule-310d1648f44c070d613992ddf04e0cb14c39ba764249241026d0fb8f97556b61ebd3a884b7b31932296bea1239b040c54eb3b1a2224bad944b189ae8ec55ea36"' :
                                            'id="xs-controllers-links-module-ContactsModule-310d1648f44c070d613992ddf04e0cb14c39ba764249241026d0fb8f97556b61ebd3a884b7b31932296bea1239b040c54eb3b1a2224bad944b189ae8ec55ea36"' }>
                                            <li class="link">
                                                <a href="controllers/ContactsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ContactsModule-310d1648f44c070d613992ddf04e0cb14c39ba764249241026d0fb8f97556b61ebd3a884b7b31932296bea1239b040c54eb3b1a2224bad944b189ae8ec55ea36"' : 'data-bs-target="#xs-injectables-links-module-ContactsModule-310d1648f44c070d613992ddf04e0cb14c39ba764249241026d0fb8f97556b61ebd3a884b7b31932296bea1239b040c54eb3b1a2224bad944b189ae8ec55ea36"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ContactsModule-310d1648f44c070d613992ddf04e0cb14c39ba764249241026d0fb8f97556b61ebd3a884b7b31932296bea1239b040c54eb3b1a2224bad944b189ae8ec55ea36"' :
                                        'id="xs-injectables-links-module-ContactsModule-310d1648f44c070d613992ddf04e0cb14c39ba764249241026d0fb8f97556b61ebd3a884b7b31932296bea1239b040c54eb3b1a2224bad944b189ae8ec55ea36"' }>
                                        <li class="link">
                                            <a href="injectables/ContactsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ContactsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateContactsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateContactsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExperiencesModule.html" data-type="entity-link" >ExperiencesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ExperiencesModule-c05b9c5f48047a2c4046d105ad7e6edc89a0bd78b29d859911fb0492dbbb3596e1d94d5d86895208567e72a472068812c54cbf1bfe6516c673fb93c827c15aef"' : 'data-bs-target="#xs-controllers-links-module-ExperiencesModule-c05b9c5f48047a2c4046d105ad7e6edc89a0bd78b29d859911fb0492dbbb3596e1d94d5d86895208567e72a472068812c54cbf1bfe6516c673fb93c827c15aef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExperiencesModule-c05b9c5f48047a2c4046d105ad7e6edc89a0bd78b29d859911fb0492dbbb3596e1d94d5d86895208567e72a472068812c54cbf1bfe6516c673fb93c827c15aef"' :
                                            'id="xs-controllers-links-module-ExperiencesModule-c05b9c5f48047a2c4046d105ad7e6edc89a0bd78b29d859911fb0492dbbb3596e1d94d5d86895208567e72a472068812c54cbf1bfe6516c673fb93c827c15aef"' }>
                                            <li class="link">
                                                <a href="controllers/ExperiencesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperiencesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ExperiencesModule-c05b9c5f48047a2c4046d105ad7e6edc89a0bd78b29d859911fb0492dbbb3596e1d94d5d86895208567e72a472068812c54cbf1bfe6516c673fb93c827c15aef"' : 'data-bs-target="#xs-injectables-links-module-ExperiencesModule-c05b9c5f48047a2c4046d105ad7e6edc89a0bd78b29d859911fb0492dbbb3596e1d94d5d86895208567e72a472068812c54cbf1bfe6516c673fb93c827c15aef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExperiencesModule-c05b9c5f48047a2c4046d105ad7e6edc89a0bd78b29d859911fb0492dbbb3596e1d94d5d86895208567e72a472068812c54cbf1bfe6516c673fb93c827c15aef"' :
                                        'id="xs-injectables-links-module-ExperiencesModule-c05b9c5f48047a2c4046d105ad7e6edc89a0bd78b29d859911fb0492dbbb3596e1d94d5d86895208567e72a472068812c54cbf1bfe6516c673fb93c827c15aef"' }>
                                        <li class="link">
                                            <a href="injectables/CreateExperiencesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateExperiencesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExperiencesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExperiencesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-82856a5648a8ce3602f71f4faa44fe137e4bd814b9f7d0189554176a9a1c25ce835823a3d15e349a0e876359e11add1bf497add33221bfa9ddccecea56175c7f"' : 'data-bs-target="#xs-injectables-links-module-MailModule-82856a5648a8ce3602f71f4faa44fe137e4bd814b9f7d0189554176a9a1c25ce835823a3d15e349a0e876359e11add1bf497add33221bfa9ddccecea56175c7f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-82856a5648a8ce3602f71f4faa44fe137e4bd814b9f7d0189554176a9a1c25ce835823a3d15e349a0e876359e11add1bf497add33221bfa9ddccecea56175c7f"' :
                                        'id="xs-injectables-links-module-MailModule-82856a5648a8ce3602f71f4faa44fe137e4bd814b9f7d0189554176a9a1c25ce835823a3d15e349a0e876359e11add1bf497add33221bfa9ddccecea56175c7f"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-09b60c65e79d7b212463d236e98a242cf4c130e9a9adaacf8747dfe9bc6f612b3d27d421411f543627fb8704c769372240532f1f68bc72222a407964bbfede86"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-09b60c65e79d7b212463d236e98a242cf4c130e9a9adaacf8747dfe9bc6f612b3d27d421411f543627fb8704c769372240532f1f68bc72222a407964bbfede86"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-09b60c65e79d7b212463d236e98a242cf4c130e9a9adaacf8747dfe9bc6f612b3d27d421411f543627fb8704c769372240532f1f68bc72222a407964bbfede86"' :
                                        'id="xs-injectables-links-module-PaginationModule-09b60c65e79d7b212463d236e98a242cf4c130e9a9adaacf8747dfe9bc6f612b3d27d421411f543627fb8704c769372240532f1f68bc72222a407964bbfede86"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProjectsModule.html" data-type="entity-link" >ProjectsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProjectsModule-c5ebcda5f6e62490fd017ce8d965c1c1a8cadc3fa855cf0bf595c2d7c33f633c10cda97fada5a2f1661520a9493083a8f2a9741ef11463d556c5cdc6473e3d12"' : 'data-bs-target="#xs-controllers-links-module-ProjectsModule-c5ebcda5f6e62490fd017ce8d965c1c1a8cadc3fa855cf0bf595c2d7c33f633c10cda97fada5a2f1661520a9493083a8f2a9741ef11463d556c5cdc6473e3d12"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProjectsModule-c5ebcda5f6e62490fd017ce8d965c1c1a8cadc3fa855cf0bf595c2d7c33f633c10cda97fada5a2f1661520a9493083a8f2a9741ef11463d556c5cdc6473e3d12"' :
                                            'id="xs-controllers-links-module-ProjectsModule-c5ebcda5f6e62490fd017ce8d965c1c1a8cadc3fa855cf0bf595c2d7c33f633c10cda97fada5a2f1661520a9493083a8f2a9741ef11463d556c5cdc6473e3d12"' }>
                                            <li class="link">
                                                <a href="controllers/ProjectsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProjectsModule-c5ebcda5f6e62490fd017ce8d965c1c1a8cadc3fa855cf0bf595c2d7c33f633c10cda97fada5a2f1661520a9493083a8f2a9741ef11463d556c5cdc6473e3d12"' : 'data-bs-target="#xs-injectables-links-module-ProjectsModule-c5ebcda5f6e62490fd017ce8d965c1c1a8cadc3fa855cf0bf595c2d7c33f633c10cda97fada5a2f1661520a9493083a8f2a9741ef11463d556c5cdc6473e3d12"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProjectsModule-c5ebcda5f6e62490fd017ce8d965c1c1a8cadc3fa855cf0bf595c2d7c33f633c10cda97fada5a2f1661520a9493083a8f2a9741ef11463d556c5cdc6473e3d12"' :
                                        'id="xs-injectables-links-module-ProjectsModule-c5ebcda5f6e62490fd017ce8d965c1c1a8cadc3fa855cf0bf595c2d7c33f633c10cda97fada5a2f1661520a9493083a8f2a9741ef11463d556c5cdc6473e3d12"' }>
                                        <li class="link">
                                            <a href="injectables/CreateProjectsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateProjectsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProjectsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProjectsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-3607f270265a283ee271f110e76fa711fd75d3cc93090f933b59434cb033bee30e2b8cc7c559d699a8ab642ea799cd36a72c0afceb410575d9dcf729bebd8eab"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-3607f270265a283ee271f110e76fa711fd75d3cc93090f933b59434cb033bee30e2b8cc7c559d699a8ab642ea799cd36a72c0afceb410575d9dcf729bebd8eab"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-3607f270265a283ee271f110e76fa711fd75d3cc93090f933b59434cb033bee30e2b8cc7c559d699a8ab642ea799cd36a72c0afceb410575d9dcf729bebd8eab"' :
                                            'id="xs-controllers-links-module-TagsModule-3607f270265a283ee271f110e76fa711fd75d3cc93090f933b59434cb033bee30e2b8cc7c559d699a8ab642ea799cd36a72c0afceb410575d9dcf729bebd8eab"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-3607f270265a283ee271f110e76fa711fd75d3cc93090f933b59434cb033bee30e2b8cc7c559d699a8ab642ea799cd36a72c0afceb410575d9dcf729bebd8eab"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-3607f270265a283ee271f110e76fa711fd75d3cc93090f933b59434cb033bee30e2b8cc7c559d699a8ab642ea799cd36a72c0afceb410575d9dcf729bebd8eab"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-3607f270265a283ee271f110e76fa711fd75d3cc93090f933b59434cb033bee30e2b8cc7c559d699a8ab642ea799cd36a72c0afceb410575d9dcf729bebd8eab"' :
                                        'id="xs-injectables-links-module-TagsModule-3607f270265a283ee271f110e76fa711fd75d3cc93090f933b59434cb033bee30e2b8cc7c559d699a8ab642ea799cd36a72c0afceb410575d9dcf729bebd8eab"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-e0f6584985e2168c1ae75535f9140642ab0609c5604dd15eac77819d9b2adac73cbf0783c11d4d1101382160382c9ff968e12fc36d13a2dadf6cfdf0a9af7904"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-e0f6584985e2168c1ae75535f9140642ab0609c5604dd15eac77819d9b2adac73cbf0783c11d4d1101382160382c9ff968e12fc36d13a2dadf6cfdf0a9af7904"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-e0f6584985e2168c1ae75535f9140642ab0609c5604dd15eac77819d9b2adac73cbf0783c11d4d1101382160382c9ff968e12fc36d13a2dadf6cfdf0a9af7904"' :
                                            'id="xs-controllers-links-module-UsersModule-e0f6584985e2168c1ae75535f9140642ab0609c5604dd15eac77819d9b2adac73cbf0783c11d4d1101382160382c9ff968e12fc36d13a2dadf6cfdf0a9af7904"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-e0f6584985e2168c1ae75535f9140642ab0609c5604dd15eac77819d9b2adac73cbf0783c11d4d1101382160382c9ff968e12fc36d13a2dadf6cfdf0a9af7904"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-e0f6584985e2168c1ae75535f9140642ab0609c5604dd15eac77819d9b2adac73cbf0783c11d4d1101382160382c9ff968e12fc36d13a2dadf6cfdf0a9af7904"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-e0f6584985e2168c1ae75535f9140642ab0609c5604dd15eac77819d9b2adac73cbf0783c11d4d1101382160382c9ff968e12fc36d13a2dadf6cfdf0a9af7904"' :
                                        'id="xs-injectables-links-module-UsersModule-e0f6584985e2168c1ae75535f9140642ab0609c5604dd15eac77819d9b2adac73cbf0783c11d4d1101382160382c9ff968e12fc36d13a2dadf6cfdf0a9af7904"' }>
                                        <li class="link">
                                            <a href="injectables/CreateUserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneUserByEmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneUserByEmailService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserCreateManyProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCreateManyProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ContactsController.html" data-type="entity-link" >ContactsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ExperiencesController.html" data-type="entity-link" >ExperiencesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProjectsController.html" data-type="entity-link" >ProjectsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TagsController.html" data-type="entity-link" >TagsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Contact.html" data-type="entity-link" >Contact</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Experience.html" data-type="entity-link" >Experience</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Project.html" data-type="entity-link" >Project</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateContactDto.html" data-type="entity-link" >CreateContactDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExperienceDto.html" data-type="entity-link" >CreateExperienceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateManyUserDto.html" data-type="entity-link" >CreateManyUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProjectDto.html" data-type="entity-link" >CreateProjectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetContactsbaseDto.html" data-type="entity-link" >GetContactsbaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetContactsDto.html" data-type="entity-link" >GetContactsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetContactsParamDto.html" data-type="entity-link" >GetContactsParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetExperiencesbaseDto.html" data-type="entity-link" >GetExperiencesbaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetExperiencesDto.html" data-type="entity-link" >GetExperiencesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetExperiencesParamDto.html" data-type="entity-link" >GetExperiencesParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProjectsbaseDto.html" data-type="entity-link" >GetProjectsbaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProjectsDto.html" data-type="entity-link" >GetProjectsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProjectsParamDto.html" data-type="entity-link" >GetProjectsParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchExperienceDto.html" data-type="entity-link" >PatchExperienceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchProjectDto.html" data-type="entity-link" >PatchProjectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BcryptService.html" data-type="entity-link" >BcryptService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactsService.html" data-type="entity-link" >ContactsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateContactsService.html" data-type="entity-link" >CreateContactsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateExperiencesService.html" data-type="entity-link" >CreateExperiencesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateProjectsService.html" data-type="entity-link" >CreateProjectsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateUserService.html" data-type="entity-link" >CreateUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" >DataResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExperiencesService.html" data-type="entity-link" >ExperiencesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FindOneUserByEmailService.html" data-type="entity-link" >FindOneUserByEmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GenerateTokensService.html" data-type="entity-link" >GenerateTokensService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingService.html" data-type="entity-link" >HashingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaginationProvider.html" data-type="entity-link" >PaginationProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectsService.html" data-type="entity-link" >ProjectsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokensService.html" data-type="entity-link" >RefreshTokensService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SignInService.html" data-type="entity-link" >SignInService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TagsService.html" data-type="entity-link" >TagsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserCreateManyProvider.html" data-type="entity-link" >UserCreateManyProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});