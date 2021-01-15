  let Helpers = require('../utils/helpers.js');

  describe('test of de email geldig is', () => {
      test('email moet een string zijn', () => {
          expect(Helpers.checkValidEmail()).toBeFalsy();
          expect(Helpers.checkValidEmail(101)).toBeFalsy();
          expect(Helpers.checkValidEmail([])).toBeFalsy();
          expect(Helpers.checkValidEmail(null)).toBeFalsy();
          expect(Helpers.checkValidEmail(-56)).toBeFalsy();
      });

      test('email moet langer dan 1 zijn', () => {
          expect(Helpers.checkValidEmail("h")).toBeFalsy();
      });

      test('email moet korter zijn dan 254', () => {
          expect(Helpers.checkValidEmail("valid@email.com").length).toBeLessThanOrEqual(254);
          expect(Helpers.checkValidEmail("impggdcshvzxdbwphvjnschiazqbgldxpihnjfwamljsdeqvljlcaqileanjldgnljdtmxnfaodoukkxzmqiqgozhtnzmbicmcrjwrasocqmjdiqivdspimvelcumcphsaoayzxblkmlvwnbxaamlmzmpuvhhfklkfvtdghvgphizhfithfdcnkqslduwfgqfjnbwyqpnqiqfbbqgagryuwyhqevdpenunejrabtmatwzkdwdfgxklumliggotwisnnttm")).toBeFalsy();
      });

      test('email moet de juiste tekens bevatten', () => {
          expect(Helpers.checkValidEmail("/*")).toBeFalsy();
      });
  });