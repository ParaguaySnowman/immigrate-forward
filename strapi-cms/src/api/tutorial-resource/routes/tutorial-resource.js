'use strict';

/**
 * tutorial-resource router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::tutorial-resource.tutorial-resource');
