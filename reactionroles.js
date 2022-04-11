require("dotenv").config();
const rolesIndex = [
  { role: "1", messageid: "2" },
  { role: "3", messageid: "4" },
];
module.exports = {
  giveRole: function (role, user) {
    user.roles.add(role);
  },

  removeRole: function (role, user) {
    user.roles.remove(role);
  },
};
