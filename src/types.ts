export type FormApiValuesType = {
  idInstance: string;
  apiTokenInstance: string;
};

export type FormSendMessageValuesType = {
  number: string;
  message: string;
};

export type FormSendFileByUrlValuesType = {
  number: string;
  imgUrl: string;
};

export type GetSettingsResponseType = {
  wid: string;
  countryInstance: string;
  typeAccount: string;
  webhookUrl: string;
  webhookUrlToken: string;
  delaySendMessagesMilliseconds: number;
  markIncomingMessagesReaded: string;
  markIncomingMessagesReadedOnReply: string;
  sharedSession: string;
  proxyInstance: string;
  outgoingWebhook: string;
  outgoingMessageWebhook: string;
  outgoingAPIMessageWebhook: string;
  incomingWebhook: string;
  deviceWebhook: string;
  statusInstanceWebhook: string;
  stateWebhook: string;
  enableMessagesHistory: string;
  keepOnlineStatus: string;
  pollMessageWebhook: string;
  incomingBlockWebhook: string;
  incomingCallWebhook: string;
};

export type GetStateInstanceResponseType = {
  stateInstance: StateInstance;
};

export enum StateInstance {
  Authorized = "authorized",
  Blocked = "blocked",
  SleepMode = "sleepMode",
  Starting = "starting",
  YellowCard = "yellowCard",
}
