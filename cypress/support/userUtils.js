export let serverId = Cypress.env('SERVER_ID');
export const uniqueSeed = Math.floor(Date.now() / (1000 * 60 * 60)).toString();
export const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
export const testUsername = 'testuser' + uniqueSeed;
export const testEmail = `${testUsername}@${serverId}.mailosaur.net`;
export const invalidEmail = 'invalidemail';
export const spaceEmail = ' ';
export const shortUsername = 'aa';
export const testPassword = 'Testing1234';
export const shortPassword = 'Test1';
export const wrongPassword = 'test1234';
export const newPassword = 'Newpassword123';
export const noUppercasePassword = 'abcdefg11';
export const noLowercasePassword = 'ABCDEFG11';
export const fName = 'fName'
export const lName = 'lName'

