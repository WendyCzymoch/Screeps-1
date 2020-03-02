module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        // if creep is supposed to complete a constructionSite
        if (creep.memory.working === true) {
            if (creep.room.name === creep.memory.target) {
                // find closest constructionSite
                let target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (creep.build(target) === ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#008000',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
            }
            else {
                // find exit to target room
                let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target));
                // move to exit
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#008000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
        }
        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === false) {
            if (creep.room.name === creep.memory.home) {
                let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY]>250);
                    }
                });
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#880000',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
            }
            else {
                // find exit to home room
                let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.home));
                // and move to exit
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#880000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
        }
    }
};