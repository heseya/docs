import{e as n}from"./app.3a4a8f90.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},t=n(`<h1 id="auth-axios-enhancer" tabindex="-1"><a class="header-anchor" href="#auth-axios-enhancer" aria-hidden="true">#</a> Auth Axios Enhancer</h1><p>Package provides a helper function to handle everything related to the authorization. Thanks to it, you can modify the <code>axios</code> instance to add the authorization header, and to handle the token refreshing.</p><p>The instance modified in this way may be used in the <a href="#api-service"><code>createHeseyaApiService</code> function</a>.</p><div class="language-typescript ext-ts line-numbers-mode"><pre class="language-typescript"><code><span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> enhanceAxiosWithAuthTokenRefreshing <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@heseya/store-core&#39;</span>

<span class="token keyword">const</span> axiosInstance <span class="token operator">=</span> <span class="token function">enhanceAxiosWithAuthTokenRefreshing</span><span class="token punctuation">(</span>axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  heseyaUrl<span class="token operator">:</span> <span class="token string">&#39;https://api.example.com&#39;</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getAccessToken</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> localStorage<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;accessToken&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getRefreshToken</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> localStorage<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;refreshToken&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">setAccessToken</span><span class="token operator">:</span> <span class="token punctuation">(</span>token<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> localStorage<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;accessToken&#39;</span><span class="token punctuation">,</span> token<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">setRefreshToken</span><span class="token operator">:</span> <span class="token punctuation">(</span>token<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> localStorage<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;refreshToken&#39;</span><span class="token punctuation">,</span> token<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>Modified axios will try to refresh the access token every time the request fails with the <code>401</code> response code. If token refreshing will succeed, the request will be retried, otherwise axios will throw original error.</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>When token refreshing fails, not only the original error will be thrown, but also the <code>config.onTokenRefreshError</code> function will be called. You should use it to logout the user.</p></div><h2 id="config-object" tabindex="-1"><a class="header-anchor" href="#config-object" aria-hidden="true">#</a> Config object</h2><table><thead><tr><th>Key</th><th>Description</th></tr></thead><tbody><tr><td><code>heseyaUrl</code></td><td>URL of the Heseya API</td></tr><tr><td><code>getAccessToken</code></td><td>Function that returns the access token or a promise returning it</td></tr><tr><td><code>getRefreshToken</code></td><td>Function that returns the refresh token or a promise returning it</td></tr><tr><td><code>setAccessToken</code></td><td>Function that sets the access token</td></tr><tr><td><code>setRefreshToken</code></td><td>Function that sets the refresh token</td></tr><tr><td><code>setIdentityToken</code></td><td>Function that sets the identity token</td></tr><tr><td><code>onTokenRefreshError</code></td><td>Function that is called when token refreshing fails</td></tr><tr><td><code>shouldIncludeAuthorizationHeader</code></td><td>Function that should return <code>true</code> if the authorization header needs be included in the request. By default it&#39;s being added to every request.</td></tr></tbody></table>`,8);function e(o,c){return t}var i=s(a,[["render",e]]);export{i as default};