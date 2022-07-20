
/**
 * Down action
 *
 */
export const downAction = async (step, options) => {

    /* Step 1. Restore database connection options */
    const connOptions = createConnOptions();

    await createSchemaService(connOptions, async (service) => {
        service.check();
    });

};
