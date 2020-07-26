const logger = require('./logger');

const populateWithDummyData = async (issue) => {
  try {
    await issue.create({
      title: 'HODOR IPSUM',
      description: ` HODOR HODOR! Hodor? Hodor, hodor. Hodor. hodor\
            HODOR! Hodor. Hodor`,
      status: 'TODO',
      estimate: 1,
    });
    await issue.create({
      title: 'BACON IPSUM',
      description: `Bacon ipsum dolor amet flank pork loin brisket\
            burgdoggen meatball sausage jerky buffalo. `,
      status: 'CLOSED',
      estimate: 5,
    });
    await issue.create({
      title: 'OFFICE IPSUM',
      description: `This is our north star design. I dont care if you got some copy,\
            why you dont use officeipsum com or something like that ?. `,
      status: 'PENDING',
      estimate: 3,
    });
    await issue.create({
      title: 'CAT IPSUM',
      description: `Cat cat moo moo lick ears lick paws chew foot head nudges .\
           Intently stare at the same spot murr i hate humans they are so annoying \
           let me in let me out`,
      status: 'TODO',
      estimate: 2,
    });
    await issue.create({
      title: 'CUPCAKE IPSUM',
      description: `Wafer cheesecake oat cake cupcake pudding. Chocolate bar \
          jelly-o chocolate bar dragée. Jelly cookie marzipan bonbon sweet.`,
      status: 'PENDING',
      estimate: 2,
    });
    await issue.create({
      title: 'ZOMBIE IPSUM',
      description: `Zombie ipsum brains reversus ab cerebellum viral inferno, \
          brein nam rick mend grimes .`,
      status: 'TODO',
      estimate: 8,
    });
    logger.info('populated with dummy data');
  } catch (error) {
    logger.error('cannot populate DB', error);
  }
};

module.exports = populateWithDummyData;
