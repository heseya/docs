import{r as o,o as r,c as n,a as e,b as a,w as i,F as h,d as t,e as l}from"./app.3a4a8f90.js";import{_ as d}from"./plugin-vue_export-helper.21dcd24c.js";var c="/auth/tokens.png",u="/auth/authentication-flow.png";const p={},m=e("h1",{id:"authorization",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#authorization","aria-hidden":"true"},"#"),t(" Authorization")],-1),f={class:"table-of-contents"},g=t("Basic"),_=t("Types of tokens"),b=t("Permissions"),v=t("Roles"),k=t("User authorization"),y=t("App authorization"),z=l(`<h2 id="basic" tabindex="-1"><a class="header-anchor" href="#basic" aria-hidden="true">#</a> Basic</h2><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>We highly recommend use of <a href="/developer/js-sdk">SDK</a> instead of implementing authorization yourself.</p></div><p>Heseya uses bearer authentication.</p><p>To authenticate, the user must send an <code>Authorization</code> header with prefix <code>Bearer</code> and a token in each request:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Authorization: Bearer &lt;token&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="types-of-tokens" tabindex="-1"><a class="header-anchor" href="#types-of-tokens" aria-hidden="true">#</a> Types of tokens</h3><p>There are several types of tokens, used for different purposes.</p><ul><li><strong>Access Token</strong> - Used by the User for operations on Core API. Only user permissions are checked.</li><li><strong>Integration Token</strong> - Used by application for operations on Core API. Obtained by applications at the time of installation.</li><li><strong>Identity Token</strong> - Used by the User for operations on application. The token would have the user&#39;s privileges for a given integration. It is obtained by the admin dashboard for a given app. Core API creates it (stores the app ID and user ID in it) and passes it to the dashboard. The dashboard further passes the token to microservice or uses it itself for microservice operations. The microservice can use this token to get the given user&#39;s permissions from Core API for the given app.</li></ul><p><img src="`+c+'" alt="Autrentication diagram"></p><h2 id="permissions" tabindex="-1"><a class="header-anchor" href="#permissions" aria-hidden="true">#</a> Permissions</h2><p>To access certain endpoints, the user/application must have the proper permissions.</p><ul><li>Users can be assigned to roles with right permissions.</li><li>Apps are assigned directly to permissions.</li></ul><h3 id="roles" tabindex="-1"><a class="header-anchor" href="#roles" aria-hidden="true">#</a> Roles</h3><p>Roles can be created without restrictions. If a user has permissions to create roles, he can create roles and give them all the permissions that he himself has. The same for editing and deleting, he can manage roles that have the same or lower privileges.</p><p>System have 3 build-in roles:</p><ul><li><strong>Unauthenticated</strong> - define permissions for non-authorized users</li><li><strong>Authenticated</strong> - every logged user has this role</li><li><strong>Owner</strong> - role with every permission, can&#39;t be edited, at least one user must have it</li></ul><h2 id="user-authorization" tabindex="-1"><a class="header-anchor" href="#user-authorization" aria-hidden="true">#</a> User authorization</h2><p>User can access his token using <code>/auth/login</code> endpoint.</p><h2 id="app-authorization" tabindex="-1"><a class="header-anchor" href="#app-authorization" aria-hidden="true">#</a> App authorization</h2><p>Applications use a different authorization scheme than users.</p><p><img src="'+u+'" alt="Autrentication diagram"></p>',21);function x(A,T){const s=o("RouterLink");return r(),n(h,null,[m,e("nav",f,[e("ul",null,[e("li",null,[a(s,{to:"#basic"},{default:i(()=>[g]),_:1}),e("ul",null,[e("li",null,[a(s,{to:"#types-of-tokens"},{default:i(()=>[_]),_:1})])])]),e("li",null,[a(s,{to:"#permissions"},{default:i(()=>[b]),_:1}),e("ul",null,[e("li",null,[a(s,{to:"#roles"},{default:i(()=>[v]),_:1})])])]),e("li",null,[a(s,{to:"#user-authorization"},{default:i(()=>[k]),_:1})]),e("li",null,[a(s,{to:"#app-authorization"},{default:i(()=>[y]),_:1})])])]),z],64)}var U=d(p,[["render",x]]);export{U as default};