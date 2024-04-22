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
                    <a href="index.html" data-type="index-link">nest-basic-hoidanit documentation</a>
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
                                <span class="icon ion-ios-paper"></span>README
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
                                            'data-bs-target="#controllers-links-module-AppModule-8bd197c79e6e3518c4fff7447df8adff9bd21bf00664cb8199491d02f5e1fac633dddd4b79636cd19813c87626123c914af7f490cb749154ead1509da13d59d7"' : 'data-bs-target="#xs-controllers-links-module-AppModule-8bd197c79e6e3518c4fff7447df8adff9bd21bf00664cb8199491d02f5e1fac633dddd4b79636cd19813c87626123c914af7f490cb749154ead1509da13d59d7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-8bd197c79e6e3518c4fff7447df8adff9bd21bf00664cb8199491d02f5e1fac633dddd4b79636cd19813c87626123c914af7f490cb749154ead1509da13d59d7"' :
                                            'id="xs-controllers-links-module-AppModule-8bd197c79e6e3518c4fff7447df8adff9bd21bf00664cb8199491d02f5e1fac633dddd4b79636cd19813c87626123c914af7f490cb749154ead1509da13d59d7"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-8bd197c79e6e3518c4fff7447df8adff9bd21bf00664cb8199491d02f5e1fac633dddd4b79636cd19813c87626123c914af7f490cb749154ead1509da13d59d7"' : 'data-bs-target="#xs-injectables-links-module-AppModule-8bd197c79e6e3518c4fff7447df8adff9bd21bf00664cb8199491d02f5e1fac633dddd4b79636cd19813c87626123c914af7f490cb749154ead1509da13d59d7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-8bd197c79e6e3518c4fff7447df8adff9bd21bf00664cb8199491d02f5e1fac633dddd4b79636cd19813c87626123c914af7f490cb749154ead1509da13d59d7"' :
                                        'id="xs-injectables-links-module-AppModule-8bd197c79e6e3518c4fff7447df8adff9bd21bf00664cb8199491d02f5e1fac633dddd4b79636cd19813c87626123c914af7f490cb749154ead1509da13d59d7"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-764c710f9ea6a0072e5a47eb38e3f1525c00e42f6c325f7afba72649b7dfdaa47f80e887616330e8a4d7584130a2be05cf78eae0b02e22c5d5cccc5711b70e0b"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-764c710f9ea6a0072e5a47eb38e3f1525c00e42f6c325f7afba72649b7dfdaa47f80e887616330e8a4d7584130a2be05cf78eae0b02e22c5d5cccc5711b70e0b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-764c710f9ea6a0072e5a47eb38e3f1525c00e42f6c325f7afba72649b7dfdaa47f80e887616330e8a4d7584130a2be05cf78eae0b02e22c5d5cccc5711b70e0b"' :
                                            'id="xs-controllers-links-module-AuthModule-764c710f9ea6a0072e5a47eb38e3f1525c00e42f6c325f7afba72649b7dfdaa47f80e887616330e8a4d7584130a2be05cf78eae0b02e22c5d5cccc5711b70e0b"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-764c710f9ea6a0072e5a47eb38e3f1525c00e42f6c325f7afba72649b7dfdaa47f80e887616330e8a4d7584130a2be05cf78eae0b02e22c5d5cccc5711b70e0b"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-764c710f9ea6a0072e5a47eb38e3f1525c00e42f6c325f7afba72649b7dfdaa47f80e887616330e8a4d7584130a2be05cf78eae0b02e22c5d5cccc5711b70e0b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-764c710f9ea6a0072e5a47eb38e3f1525c00e42f6c325f7afba72649b7dfdaa47f80e887616330e8a4d7584130a2be05cf78eae0b02e22c5d5cccc5711b70e0b"' :
                                        'id="xs-injectables-links-module-AuthModule-764c710f9ea6a0072e5a47eb38e3f1525c00e42f6c325f7afba72649b7dfdaa47f80e887616330e8a4d7584130a2be05cf78eae0b02e22c5d5cccc5711b70e0b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompanyModule.html" data-type="entity-link" >CompanyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompanyModule-1eaa916e14a4941987326f4102d44fa27952da5fd3567f14fa003c630db1844ab5d23a08a72397a423c08348375f3895812373ded6ebc97ace95cbc8e51e944c"' : 'data-bs-target="#xs-controllers-links-module-CompanyModule-1eaa916e14a4941987326f4102d44fa27952da5fd3567f14fa003c630db1844ab5d23a08a72397a423c08348375f3895812373ded6ebc97ace95cbc8e51e944c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompanyModule-1eaa916e14a4941987326f4102d44fa27952da5fd3567f14fa003c630db1844ab5d23a08a72397a423c08348375f3895812373ded6ebc97ace95cbc8e51e944c"' :
                                            'id="xs-controllers-links-module-CompanyModule-1eaa916e14a4941987326f4102d44fa27952da5fd3567f14fa003c630db1844ab5d23a08a72397a423c08348375f3895812373ded6ebc97ace95cbc8e51e944c"' }>
                                            <li class="link">
                                                <a href="controllers/CompanyController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompanyModule-1eaa916e14a4941987326f4102d44fa27952da5fd3567f14fa003c630db1844ab5d23a08a72397a423c08348375f3895812373ded6ebc97ace95cbc8e51e944c"' : 'data-bs-target="#xs-injectables-links-module-CompanyModule-1eaa916e14a4941987326f4102d44fa27952da5fd3567f14fa003c630db1844ab5d23a08a72397a423c08348375f3895812373ded6ebc97ace95cbc8e51e944c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompanyModule-1eaa916e14a4941987326f4102d44fa27952da5fd3567f14fa003c630db1844ab5d23a08a72397a423c08348375f3895812373ded6ebc97ace95cbc8e51e944c"' :
                                        'id="xs-injectables-links-module-CompanyModule-1eaa916e14a4941987326f4102d44fa27952da5fd3567f14fa003c630db1844ab5d23a08a72397a423c08348375f3895812373ded6ebc97ace95cbc8e51e944c"' }>
                                        <li class="link">
                                            <a href="injectables/CompanyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabasesModule.html" data-type="entity-link" >DatabasesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DatabasesModule-2ca4e7fba9d4a36e9a82fbb33ac211f2822b36ede20e090388c1908e3e042c163f82d9208f9f2d3c0a63fc20a9918e88d9a373fc7d1a645f621af7e801f42f7e"' : 'data-bs-target="#xs-controllers-links-module-DatabasesModule-2ca4e7fba9d4a36e9a82fbb33ac211f2822b36ede20e090388c1908e3e042c163f82d9208f9f2d3c0a63fc20a9918e88d9a373fc7d1a645f621af7e801f42f7e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DatabasesModule-2ca4e7fba9d4a36e9a82fbb33ac211f2822b36ede20e090388c1908e3e042c163f82d9208f9f2d3c0a63fc20a9918e88d9a373fc7d1a645f621af7e801f42f7e"' :
                                            'id="xs-controllers-links-module-DatabasesModule-2ca4e7fba9d4a36e9a82fbb33ac211f2822b36ede20e090388c1908e3e042c163f82d9208f9f2d3c0a63fc20a9918e88d9a373fc7d1a645f621af7e801f42f7e"' }>
                                            <li class="link">
                                                <a href="controllers/DatabasesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DatabasesModule-2ca4e7fba9d4a36e9a82fbb33ac211f2822b36ede20e090388c1908e3e042c163f82d9208f9f2d3c0a63fc20a9918e88d9a373fc7d1a645f621af7e801f42f7e"' : 'data-bs-target="#xs-injectables-links-module-DatabasesModule-2ca4e7fba9d4a36e9a82fbb33ac211f2822b36ede20e090388c1908e3e042c163f82d9208f9f2d3c0a63fc20a9918e88d9a373fc7d1a645f621af7e801f42f7e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DatabasesModule-2ca4e7fba9d4a36e9a82fbb33ac211f2822b36ede20e090388c1908e3e042c163f82d9208f9f2d3c0a63fc20a9918e88d9a373fc7d1a645f621af7e801f42f7e"' :
                                        'id="xs-injectables-links-module-DatabasesModule-2ca4e7fba9d4a36e9a82fbb33ac211f2822b36ede20e090388c1908e3e042c163f82d9208f9f2d3c0a63fc20a9918e88d9a373fc7d1a645f621af7e801f42f7e"' }>
                                        <li class="link">
                                            <a href="injectables/DatabasesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabasesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FilesModule.html" data-type="entity-link" >FilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FilesModule-b0b97fa5cf5145db3a34d3df60a68da6af5e256189373fe2f977af5defcb4c0c8d82849c8ce703ffea3cbaafc6cbb6e4c149ece564644f6894584d5088d76ed1"' : 'data-bs-target="#xs-controllers-links-module-FilesModule-b0b97fa5cf5145db3a34d3df60a68da6af5e256189373fe2f977af5defcb4c0c8d82849c8ce703ffea3cbaafc6cbb6e4c149ece564644f6894584d5088d76ed1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FilesModule-b0b97fa5cf5145db3a34d3df60a68da6af5e256189373fe2f977af5defcb4c0c8d82849c8ce703ffea3cbaafc6cbb6e4c149ece564644f6894584d5088d76ed1"' :
                                            'id="xs-controllers-links-module-FilesModule-b0b97fa5cf5145db3a34d3df60a68da6af5e256189373fe2f977af5defcb4c0c8d82849c8ce703ffea3cbaafc6cbb6e4c149ece564644f6894584d5088d76ed1"' }>
                                            <li class="link">
                                                <a href="controllers/FilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FilesModule-b0b97fa5cf5145db3a34d3df60a68da6af5e256189373fe2f977af5defcb4c0c8d82849c8ce703ffea3cbaafc6cbb6e4c149ece564644f6894584d5088d76ed1"' : 'data-bs-target="#xs-injectables-links-module-FilesModule-b0b97fa5cf5145db3a34d3df60a68da6af5e256189373fe2f977af5defcb4c0c8d82849c8ce703ffea3cbaafc6cbb6e4c149ece564644f6894584d5088d76ed1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FilesModule-b0b97fa5cf5145db3a34d3df60a68da6af5e256189373fe2f977af5defcb4c0c8d82849c8ce703ffea3cbaafc6cbb6e4c149ece564644f6894584d5088d76ed1"' :
                                        'id="xs-injectables-links-module-FilesModule-b0b97fa5cf5145db3a34d3df60a68da6af5e256189373fe2f977af5defcb4c0c8d82849c8ce703ffea3cbaafc6cbb6e4c149ece564644f6894584d5088d76ed1"' }>
                                        <li class="link">
                                            <a href="injectables/FilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-079a03d7202b7ba07f1159ea69edd3488e20ab353f7708b206d290cd4468a6d1288b71108faf245b2a04773b825a39f3b05b7833046e6f685b569e696d84a0b0"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-079a03d7202b7ba07f1159ea69edd3488e20ab353f7708b206d290cd4468a6d1288b71108faf245b2a04773b825a39f3b05b7833046e6f685b569e696d84a0b0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-079a03d7202b7ba07f1159ea69edd3488e20ab353f7708b206d290cd4468a6d1288b71108faf245b2a04773b825a39f3b05b7833046e6f685b569e696d84a0b0"' :
                                            'id="xs-controllers-links-module-HealthModule-079a03d7202b7ba07f1159ea69edd3488e20ab353f7708b206d290cd4468a6d1288b71108faf245b2a04773b825a39f3b05b7833046e6f685b569e696d84a0b0"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/JobsModule.html" data-type="entity-link" >JobsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' : 'data-bs-target="#xs-controllers-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' :
                                            'id="xs-controllers-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' }>
                                            <li class="link">
                                                <a href="controllers/JobsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' : 'data-bs-target="#xs-injectables-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' :
                                        'id="xs-injectables-links-module-JobsModule-73eb5fb3c004a46fa0a315762cd06402c6520ff6714065edc30ae83345c015798c33c24f00aa86ed4080a8466847936ff2af9b0ab465ae49959ae8c34475bcc9"' }>
                                        <li class="link">
                                            <a href="injectables/JobsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MailModule-8ef7e584fcc36db1f2dc57104080d8c5afc1f9b1c5f9c0628f2c7c0d3e94efd1e9ae78163fd78d7e206ebff92b3c22548ad898f5ee2fe4b4842a49e06e1caa62"' : 'data-bs-target="#xs-controllers-links-module-MailModule-8ef7e584fcc36db1f2dc57104080d8c5afc1f9b1c5f9c0628f2c7c0d3e94efd1e9ae78163fd78d7e206ebff92b3c22548ad898f5ee2fe4b4842a49e06e1caa62"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MailModule-8ef7e584fcc36db1f2dc57104080d8c5afc1f9b1c5f9c0628f2c7c0d3e94efd1e9ae78163fd78d7e206ebff92b3c22548ad898f5ee2fe4b4842a49e06e1caa62"' :
                                            'id="xs-controllers-links-module-MailModule-8ef7e584fcc36db1f2dc57104080d8c5afc1f9b1c5f9c0628f2c7c0d3e94efd1e9ae78163fd78d7e206ebff92b3c22548ad898f5ee2fe4b4842a49e06e1caa62"' }>
                                            <li class="link">
                                                <a href="controllers/MailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-8ef7e584fcc36db1f2dc57104080d8c5afc1f9b1c5f9c0628f2c7c0d3e94efd1e9ae78163fd78d7e206ebff92b3c22548ad898f5ee2fe4b4842a49e06e1caa62"' : 'data-bs-target="#xs-injectables-links-module-MailModule-8ef7e584fcc36db1f2dc57104080d8c5afc1f9b1c5f9c0628f2c7c0d3e94efd1e9ae78163fd78d7e206ebff92b3c22548ad898f5ee2fe4b4842a49e06e1caa62"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-8ef7e584fcc36db1f2dc57104080d8c5afc1f9b1c5f9c0628f2c7c0d3e94efd1e9ae78163fd78d7e206ebff92b3c22548ad898f5ee2fe4b4842a49e06e1caa62"' :
                                        'id="xs-injectables-links-module-MailModule-8ef7e584fcc36db1f2dc57104080d8c5afc1f9b1c5f9c0628f2c7c0d3e94efd1e9ae78163fd78d7e206ebff92b3c22548ad898f5ee2fe4b4842a49e06e1caa62"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PermissionsModule.html" data-type="entity-link" >PermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PermissionsModule-e12826df17810fb5411144cd4413ff198808dcec12f746cd5b3314c6d902db1279b7a528e7e91bd1e977c267c1969c8d03fd0b5e355265c82ae29065aeb8bf5b"' : 'data-bs-target="#xs-controllers-links-module-PermissionsModule-e12826df17810fb5411144cd4413ff198808dcec12f746cd5b3314c6d902db1279b7a528e7e91bd1e977c267c1969c8d03fd0b5e355265c82ae29065aeb8bf5b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PermissionsModule-e12826df17810fb5411144cd4413ff198808dcec12f746cd5b3314c6d902db1279b7a528e7e91bd1e977c267c1969c8d03fd0b5e355265c82ae29065aeb8bf5b"' :
                                            'id="xs-controllers-links-module-PermissionsModule-e12826df17810fb5411144cd4413ff198808dcec12f746cd5b3314c6d902db1279b7a528e7e91bd1e977c267c1969c8d03fd0b5e355265c82ae29065aeb8bf5b"' }>
                                            <li class="link">
                                                <a href="controllers/PermissionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PermissionsModule-e12826df17810fb5411144cd4413ff198808dcec12f746cd5b3314c6d902db1279b7a528e7e91bd1e977c267c1969c8d03fd0b5e355265c82ae29065aeb8bf5b"' : 'data-bs-target="#xs-injectables-links-module-PermissionsModule-e12826df17810fb5411144cd4413ff198808dcec12f746cd5b3314c6d902db1279b7a528e7e91bd1e977c267c1969c8d03fd0b5e355265c82ae29065aeb8bf5b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PermissionsModule-e12826df17810fb5411144cd4413ff198808dcec12f746cd5b3314c6d902db1279b7a528e7e91bd1e977c267c1969c8d03fd0b5e355265c82ae29065aeb8bf5b"' :
                                        'id="xs-injectables-links-module-PermissionsModule-e12826df17810fb5411144cd4413ff198808dcec12f746cd5b3314c6d902db1279b7a528e7e91bd1e977c267c1969c8d03fd0b5e355265c82ae29065aeb8bf5b"' }>
                                        <li class="link">
                                            <a href="injectables/PermissionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PermissionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResumesModule.html" data-type="entity-link" >ResumesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' : 'data-bs-target="#xs-controllers-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' :
                                            'id="xs-controllers-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' }>
                                            <li class="link">
                                                <a href="controllers/ResumesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' : 'data-bs-target="#xs-injectables-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' :
                                        'id="xs-injectables-links-module-ResumesModule-eb956a2502cb4695890b8a1668b616ab014f2b7c5d36e8e249f3050b47555d5726f3bce7794cb5a6cd9f058d16aa7f4b7e5b7097d4580294491d0321c3a35c34"' }>
                                        <li class="link">
                                            <a href="injectables/ResumesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' : 'data-bs-target="#xs-controllers-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' :
                                            'id="xs-controllers-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' : 'data-bs-target="#xs-injectables-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' :
                                        'id="xs-injectables-links-module-RolesModule-48388bdfe390bfa779c20e072c2eda393ebb142f371de8b1fced0513de9d32e364c0c2fb3e8de3e5302b1d4cf5cca9982a9041bb6a20c8623cb32be0d0e16909"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-86d45e1d3c22fdccce621f1dbc82e8dfbbdccc7763e05482c1075f955941558a70020ef97613483fc606077d61c15f17a610a0defb5dc65a278f862218e1dc5b"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-86d45e1d3c22fdccce621f1dbc82e8dfbbdccc7763e05482c1075f955941558a70020ef97613483fc606077d61c15f17a610a0defb5dc65a278f862218e1dc5b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-86d45e1d3c22fdccce621f1dbc82e8dfbbdccc7763e05482c1075f955941558a70020ef97613483fc606077d61c15f17a610a0defb5dc65a278f862218e1dc5b"' :
                                            'id="xs-controllers-links-module-SubscribersModule-86d45e1d3c22fdccce621f1dbc82e8dfbbdccc7763e05482c1075f955941558a70020ef97613483fc606077d61c15f17a610a0defb5dc65a278f862218e1dc5b"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-86d45e1d3c22fdccce621f1dbc82e8dfbbdccc7763e05482c1075f955941558a70020ef97613483fc606077d61c15f17a610a0defb5dc65a278f862218e1dc5b"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-86d45e1d3c22fdccce621f1dbc82e8dfbbdccc7763e05482c1075f955941558a70020ef97613483fc606077d61c15f17a610a0defb5dc65a278f862218e1dc5b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-86d45e1d3c22fdccce621f1dbc82e8dfbbdccc7763e05482c1075f955941558a70020ef97613483fc606077d61c15f17a610a0defb5dc65a278f862218e1dc5b"' :
                                        'id="xs-injectables-links-module-SubscribersModule-86d45e1d3c22fdccce621f1dbc82e8dfbbdccc7763e05482c1075f955941558a70020ef97613483fc606077d61c15f17a610a0defb5dc65a278f862218e1dc5b"' }>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-84816d10d2c214a0c4fa3ccfac1a44c2a850970dc04392baa54c63de9ce98a3098f15cbc29c7970c43de0229e54fa739d04c1077ca0e60a1812e9fa5bfe6f1c4"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-84816d10d2c214a0c4fa3ccfac1a44c2a850970dc04392baa54c63de9ce98a3098f15cbc29c7970c43de0229e54fa739d04c1077ca0e60a1812e9fa5bfe6f1c4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-84816d10d2c214a0c4fa3ccfac1a44c2a850970dc04392baa54c63de9ce98a3098f15cbc29c7970c43de0229e54fa739d04c1077ca0e60a1812e9fa5bfe6f1c4"' :
                                            'id="xs-controllers-links-module-UsersModule-84816d10d2c214a0c4fa3ccfac1a44c2a850970dc04392baa54c63de9ce98a3098f15cbc29c7970c43de0229e54fa739d04c1077ca0e60a1812e9fa5bfe6f1c4"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-84816d10d2c214a0c4fa3ccfac1a44c2a850970dc04392baa54c63de9ce98a3098f15cbc29c7970c43de0229e54fa739d04c1077ca0e60a1812e9fa5bfe6f1c4"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-84816d10d2c214a0c4fa3ccfac1a44c2a850970dc04392baa54c63de9ce98a3098f15cbc29c7970c43de0229e54fa739d04c1077ca0e60a1812e9fa5bfe6f1c4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-84816d10d2c214a0c4fa3ccfac1a44c2a850970dc04392baa54c63de9ce98a3098f15cbc29c7970c43de0229e54fa739d04c1077ca0e60a1812e9fa5bfe6f1c4"' :
                                        'id="xs-injectables-links-module-UsersModule-84816d10d2c214a0c4fa3ccfac1a44c2a850970dc04392baa54c63de9ce98a3098f15cbc29c7970c43de0229e54fa739d04c1077ca0e60a1812e9fa5bfe6f1c4"' }>
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
                                    <a href="controllers/CompanyController.html" data-type="entity-link" >CompanyController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DatabasesController.html" data-type="entity-link" >DatabasesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/FilesController.html" data-type="entity-link" >FilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/JobsController.html" data-type="entity-link" >JobsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MailController.html" data-type="entity-link" >MailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PermissionsController.html" data-type="entity-link" >PermissionsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ResumesController.html" data-type="entity-link" >ResumesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RolesController.html" data-type="entity-link" >RolesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SubscribersController.html" data-type="entity-link" >SubscribersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
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
                                <a href="classes/Company.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-1.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/Company-2.html" data-type="entity-link" >Company</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFileDto.html" data-type="entity-link" >CreateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateJobDto.html" data-type="entity-link" >CreateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePermissionDto.html" data-type="entity-link" >CreatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateResumeDto.html" data-type="entity-link" >CreateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRoleDto.html" data-type="entity-link" >CreateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCvDto.html" data-type="entity-link" >CreateUserCvDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/File.html" data-type="entity-link" >File</a>
                            </li>
                            <li class="link">
                                <a href="classes/Job.html" data-type="entity-link" >Job</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Resume.html" data-type="entity-link" >Resume</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link" >Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompanyDto.html" data-type="entity-link" >UpdateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFileDto.html" data-type="entity-link" >UpdateFileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateJobDto.html" data-type="entity-link" >UpdateJobDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePermissionDto.html" data-type="entity-link" >UpdatePermissionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateResumeDto.html" data-type="entity-link" >UpdateResumeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRoleDto.html" data-type="entity-link" >UpdateRoleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSubscriberDto.html" data-type="entity-link" >UpdateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
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
                                    <a href="injectables/CompanyService.html" data-type="entity-link" >CompanyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DatabasesService.html" data-type="entity-link" >DatabasesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilesService.html" data-type="entity-link" >FilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JobsService.html" data-type="entity-link" >JobsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PermissionsService.html" data-type="entity-link" >PermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResumesService.html" data-type="entity-link" >ResumesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolesService.html" data-type="entity-link" >RolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscribersService.html" data-type="entity-link" >SubscribersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
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
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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