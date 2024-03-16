'use strict';

/**
 * tutorial-resource service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tutorial-resource.tutorial-resource');
