<template>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Login</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          <div class="box">
              <form>
                  <div class="columns">
                      <div class="column">
                  <div class="field">
                    <div class="control">
                      <input class="input is-large" placeholder="Your Email" autofocus="" type="email">
                    </div>
                </div>
                </div>
                </div>

                  <div class="columns">
                      <div class="column">
              <div class="field">
                <div class="control">
                  <input class="input is-large" placeholder="Your Password" type="password">
                </div>
            </div>
        </div>
        </div>
                  <div class="columns">
                      <div class="column">
              <div class="field">
                <label class="checkbox">
                  <input type="checkbox">
                  Remember me
                </label>
            </div>
        </div>
        </div>
              <a class="button is-block is-info is-large">Login</a>
            </form>
          </div>
          <p class="has-text-grey">
            <a class="has-text-grey" href="../">Sign Up</a> &nbsp;·&nbsp;
            <a class="has-text-grey" href="../">Forgot Password</a> 
          </p>
        </div>
      </div>
    </div>
</template>

<script>
module.exports = require('./Login');
</script>
