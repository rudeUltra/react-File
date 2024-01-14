import { FileManagerComponent,NavigationPane,Toolbar,DetailsView,Inject } from '@syncfusion/ej2-react-filemanager';
import * as React from 'react';
import './file.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
function File() {
    
      
  
      //Route protection plus useEffect to fetch user

      
      
    let hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
    return (
        <div className='' style={{}}>
          <FileManagerComponent ajaxSettings={{
            url:hostUrl+"api/FileManager/FileOperations",
            downloadUrl:hostUrl+"api/FileManager/Download",
            uploadUrl:hostUrl+"api/FileManager/Upload"
          }}>

          <Inject services={[NavigationPane,Toolbar,DetailsView]}></Inject>

          </FileManagerComponent>

        </div>
    );
}
export default File;