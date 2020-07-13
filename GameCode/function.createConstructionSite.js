const getAccesPoints = require('function.getAccesPoints');

module.exports = {
  run: function(id,getRange,controllerLevel,roomName) {
    const room = Game.rooms[roomName];
    let range = getRange;
    const object = Game.getObjectById(id);
    let structureType;
    let x = object.pos.x;
    let y = object.pos.y;
    let constructionSiteCanBeBuild = false;
    function createConstruction(structureType,x,y) {
      if (room.createConstructionSite(x,y,structureType) == 0) {
        return true;

      }
      else {
        return false;
      }
    }


    if (room.controller.level >= controllerLevel) {
      structureType = STRUCTURE_LINK;
    }
    else {
      range = 1;
      structureType = STRUCTURE_CONTAINER;
    }

    const containerInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && structure.structureType == STRUCTURE_CONTAINER)}
    });
    const linkInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && structure.structureType == STRUCTURE_LINK)}
    });
    const storageInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_CONTAINER))}
    });
    const constructionSitesInRange = object.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK))}
    });


    if (constructionSitesInRange == null && ((containerInRange !== null || linkInRange !== null) || storageInRange == null)) {
      if (structureType == STRUCTURE_LINK && containerInRange !== null) {
        containerInRange.destroy();
      }

      if (createConstruction(structureType,x+range,y+range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x,y+range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x-range,y+range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x-range,y) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x-range,y-range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x,y-range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x+range,y-range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x,y-range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
    }


    return constructionSiteCanBeBuild;
  }
};
