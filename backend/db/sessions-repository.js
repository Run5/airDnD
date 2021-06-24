const { Session } = require("./models");

function randomNum(num) {
  return Math.floor(Math.random() * num) + 1;
}

function randomImage() {
  const images = [
    "/images/ex-map1-no-writting",
    "/images/ex-map2-no-writting",
    "/images/ex-map3-no-writting",
    "/images/ex-map4-no-writting",
    "/images/ex-map5-no-writting",
    "/images/ex-map6-no-writting"
  ];
  const index = Math.floor(Math.random() * images.length);
  return images[index];
}

async function create(details) {
  const session = await Session.create(details);
  return session.id;
}

async function update(details) {
  const id = details.id;
  delete details.id;
  await Session.update(
    details,
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );
  return id;
}

async function list() {
  return await Session.findAll();
}

async function listByOne(id) {
  const host_id = id
  return await Session.findAll({
    where: host_id
  });
}

async function one(id) {
  return await Session.findByPk(id);
}

async function oneRandom() {
  const allSessionsArray = await Session.findAll();
  return await Session.findByPk(randomNum(allSessionsArray.length));
}

module.exports = {
  create,
  update,
  list,
  listByOne,
  one,
  oneRandom,
  randomImage,
};
