declare const controller: {
    ctrlName: string;
    templateName: string;
    templateUri: string;
    ctrl: (string | (($scope: any, digitalTwinManagerService: any, spinalFileSystem: any, $mdDialog: any) => void))[];
};
export default controller;
