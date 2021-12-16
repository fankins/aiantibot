#!/home/a/a1konsfs/.local/bin/python3.9
import cgi
import os, sys
import json
sys.path.append('/home/a/a1konsfs/.local/lib/python3.9/site-packages/')
import pandas as pd
import gdown
import numpy as np
import base64
from tensorflow import keras
from tensorflow.keras import utils 
from tensorflow.keras import Model 
import pickle
from tensorflow.keras.models import Sequential,Model
from tensorflow.keras.layers import Dense, Flatten, Reshape, Input, Lambda, LeakyReLU
from tensorflow.keras.layers import BatchNormalization, Dropout, concatenate, Conv1D,Conv2D, Conv2DTranspose,Conv1DTranspose,MaxPooling1D
import keras.backend as K
import matplotlib.pyplot as plt
from tensorflow.keras.optimizers import Adam
from sklearn.metrics import mean_squared_error
import sys
if sys.version_info[0] < 3: 
    from StringIO import StringIO
else:
    from io import StringIO
import warnings
warnings.filterwarnings("ignore")


print("Content-Type: text/html\n\n")
#OHEColumns - столбцы, данные из которых переводим в OHE
#binaryColumns - данные из них не трогаем
#normalizeColumns - данные из них нормализуем, находя максимальное значение и деля все значения на него
OHEColumns=['htlang','vendor','productSub','connection_effectiveType','connection_rtt',
            'connection_saveData','connection_type','connection_downlinkMax','platform','language','languages','userAgent',
            'browser_name',	'browser_version','os_name','os_version','model','orientation_angle','orientation_type',
            '7936','7937','7938','35724','37445','37446'

]
binaryColumns=['remote_ip_present','local_ip_present','rt_ip_eq_ip','userActivation_hasBeenActive','userActivation_isActive',
               'cookieEnabled','locationbar_visible',
               'application_ogg','application_mp4','application_octet-stream','audio_3gpp','audio_3gpp2','audio_aac','audio_x-aac','audio_aiff','audio_x-aiff','audio_ac3','audio_basic','audio_flac','audio_x-flac','audio_mid','audio_midi','audio_x-midi','audio_mpeg','audio_x-mpeg','audio_mpegurl','audio_x-mpegurl','audio_mp4','audio_ogg','audio_wav','audio_wave','audio_x-wav','audio_x-pn-wav','video_3gpp','video_3gpp2','video_avi','video_mp4','video_x-mpeg','video_ogg','video_x-matroska','audio_webm','video_webm',
               'Times New Roman','arial','Arial','Courier New','georgia','Georgia','times','Times','Courier','verdana','Verdana','Tahoma','tahoma','Roboto','Helvetica','Arial Black','Arial Narrow','Lucida Console','MS Serif','Microsoft Sans Serif','MS Sans Serif','Palatino Linotype','Palatino','Monaco','Baskerville','Comic Sans MS','Lucida Sans Unicode','Trebuchet MS','symbol','Symbol','Segoe UI Symbol','Microsoft JhengHei','Microsoft JhengHei Light','Microsoft JhengHei Regular','impact','Impact','Wingdings','webdings','Webdings','MS Gothic','marlett','Segoe UI Semibold','Marlett','Corbel','corbel','Segoe UI Light','Segoe UI','Segoe Script','Sylfaen','sylfaen','MS PGothic','Segoe Print','Gabriola','Segoe UI Black','calibri','Calibri','Ebrima','ebrima','Cambria Math','Corbel Light','Franklin Gothic Medium','Consolas','Microsoft YaHei','Calibri Light','Candara','Cambria','cambria','Constantia','Microsoft YaHei Light','Franklin Gothic Heavy','MS UI Gothic','SimSun','Mongolian Baiti','Candara Light','Microsoft Yi Baiti','Microsoft Himalaya','Microsoft Tai Le','Microsoft New Tai Lue','Microsoft PhagsPa','MV Boli','NSimSun','Malgun Gothic','SimSun-ExtB','PMingLiU-ExtB','MingLiU-ExtB','MingLiU_HKSCS-ExtB','FontAwesome','Microsoft JhengHei UI','Microsoft JhengHei UI Light','Microsoft JhengHei UI Regular','Microsoft YaHei UI','Microsoft YaHei UI Light','Nirmala UI','Gadugi','GADUGI','Segoe UI Emoji','Leelawadee UI','Myanmar Text','Sitka Heading','Sitka Subheading','Sitka Small','Sitka Text','Sitka Banner','Yu Gothic Light','Sitka Display','Yu Gothic','Yu Gothic Medium','Javanese Text','Yu Gothic Regular','Segoe UI Historic','Yu Gothic UI Light','Yu Gothic UI','Yu Gothic UI Semibold','Yu Gothic UI Regular','Segoe MDL2 Assets','MS Reference Sans Serif','Garamond','Book Antiqua','Century Gothic','Bookman Old Style','Century','CENTURY','MS Reference Specialty','Monotype Corsiva','MT Extra','Ink Free','Bahnschrift Light','Bahnschrift SemiBold','Bahnschrift','Baskerville Old Face','Mistral','MISTRAL','Tempus Sans ITC','Lucida Handwriting','Freestyle Script','Kristen ITC','Juice ITC','Brush Script MT','Lucida Bright','Berlin Sans FB','Stencil','STENCIL','Bell MT','Playbill','PLAYBILL','Onyx','Harrington','ONYX','Colonna MT','Wide Latin','Matura MT Script Capitals','Lucida Fax','Lucida Calligraphy','Old English Text MT','Ravie','RAVIE','JOKERMAN','Poor Richard','Jokerman','Snap ITC','Vivaldi','Showcard Gothic','Niagara Solid','Niagara Engraved','Parchment','Kunstler Script','Vladimir Script','Magneto','Chiller','CHILLER','Centaur','Informal Roman','CENTAUR','Algerian','Viner Hand ITC','Californian FB','Broadway','High Tower Text','Cooper Black','Bernard MT Condensed','Footlight MT Light','HoloLens MDL2 Assets','MS Outlook','PAPYRUS','Papyrus','Haettenschweiler','Bradley Hand ITC','French Script MT','Pristina','PRISTINA','Papyrus Condensed','Rockwell','Lucida Sans','Franklin Gothic Book','Century Schoolbook','Lucida Sans Typewriter','Agency FB','Gill Sans MT','Copperplate Gothic Light','Perpetua','Edwardian Script ITC','Curlz MT','Tw Cen MT','Gill Sans MT Condensed','Engravers MT','Rockwell Condensed','Perpetua Titling MT','Imprint MT Shadow','Goudy Old Style','Calisto MT','Microsoft Uighur','Felix Titling','Tw Cen MT Condensed','Maiandra GD','Blackadder ITC','Copperplate Gothic','Palace Script MT','Elephant','Goudy Stout','Gigi','GIGI','Castellar','Bodoni MT','Bodoni MT Black','Bodoni MT Condensed','Forte','FORTE','Leelawadee','RAGE','Arial Unicode MS','MS Mincho','PMingLiU','Gulim','Dotum','GulimChe','DotumChe','MingLiU_HKSCS','MingLiU','meiryo','Meiryo','Meiryo UI','DUBAI','Plantagenet Cherokee','Latha','MS PMincho','Estrangelo Edessa','Batang','Vijaya','SimHei','Rod','Aharoni','Narkisim','Miriam','Levenim MT','Gisha','FrankRuehl','David','Miriam Fixed','Mangal','Tunga','Raavi','Gautami','Shruti','Vrinda','Andalus','Kartika','BrowalliaUPC','Angsana New','Traditional Arabic','Browallia New','Arabic Typesetting','Simplified Arabic','BatangChe','Gungsuh','GungsuhChe','CordiaUPC','Sakkal Majalla','AngsanaUPC','EucrosiaUPC','Kokila','Simplified Arabic Fixed','Utsaah','Nyala','Aparajita','JasmineUPC','FreesiaUPC','Cordia New','IrisUPC','DilleniaUPC','Lao UI','Kalinga','LilyUPC','Iskoola Pota','Khmer UI','DaunPenh','KodchiangUPC','Vani','DokChampa','Euphemia'
               ]
normalizeColumns=['fonts_count','availWidth','availHeight','width','height','plugins_length','mimeTypes_length',
                  'hardwareConcurrency','deviceMemory','connection_downlink','maxTouchPoints',
                  'devicePixelRatio','innerWidth','innerHeight','outerWidth','outerHeight','clientWidth','clientHeight','scrollWidth',
                  'visualViewport_offsetLeft','visualViewport_offsetTop',
                  'visualViewport_pageLeft','visualViewport_pageTop','visualViewport_width','visualViewport_height','visualViewport_scale',
                  '3379','3410','3412','3413','3414','3415','34024','34047','34076','34921','34930',
                  '35661','36347','36348','36349'
                  ]
def getClassNamesFromColumn(df,name):
  classNames=df[name].unique()
  return classNames

def setDataClasses():
  
  res={}
  for columnName in OHEColumns:
    res[columnName]=getClassNamesFromColumn(df,columnName)
    print(columnName,":",len(res[columnName]),"classes")
  return res

def setMaxNormalizeColums():
  res={}
  for columnName in normalizeColumns:
    
    max=df[columnName].max()
    res[columnName]=max
    print(f"max for {columnName}={max}")
  return res

def toOHE(arg,classList):
 
  result = np.zeros(len(classList))
  for i in range(len(classList)):
    if arg==classList[i]:
      result[i] = 1.
      break
  return result


def getOHEDataFromRow(dataDict,i):
  ret=[]
  for columnName in OHEColumns:
   val=toOHE(dataDict[columnName][i],classes[columnName])
   ret=np.hstack([ret,val])
  return ret

def getBinaryDataFromRow(dataDict,i):
  
  ret=[]
  for columnName in binaryColumns:
    val=dataDict[columnName][i]
    ret.append(val)
  return np.array(ret)

def getNormalizeDataFromRow(dataDict,i):
  ret=[]
  for columnName in normalizeColumns:
    val=dataDict[columnName][i]
    max=maxInRow[columnName]
    if max!=0:
      val=val/max
    else:
      val=0
    ret=np.hstack([ret,val])
  return np.array(ret)
    

def getDataFromRow(dataDict,i):
  binaryData=getBinaryDataFromRow(dataDict,i)
  normalizeData=getNormalizeDataFromRow(dataDict,i)
  OHEData=getOHEDataFromRow(dataDict,i)
  x=np.hstack([normalizeData,binaryData,
              OHEData])
  return x

def processData():
  x_data=[]
  dataDict=df.to_dict()
  for i in range(df.shape[0]):
    x=getDataFromRow(dataDict,i)
    x_data.append(x)
  return np.array(x_data)





with open('classes.pickle', 'rb') as f:
 classes=pickle.load(f)

with open('maxInRow.pickle', 'rb') as f:
 maxInRow=pickle.load(f)
#print(classes['vendor'])
#print(maxInRow)


model = keras.models.load_model("model.h")


#gdown.download('https://vyborsmartphona.ru/?a=antibot_get_params_by_hit_id&hit_id=-410180461', 'data/data.csv', quiet=True)
form = cgi.FieldStorage()
encoded=form.getfirst("data",'')
#encoded='MTIzNDU='
data=base64.b64decode(encoded).decode("utf-8") 
#print("data=",data)
stringIO=StringIO(data)
df = pd.read_csv(stringIO,sep='\t')
#df = pd.read_csv('data/data.csv',sep='\t')
hit_ids=df['hit_id']
x_test=processData()
for i in range(x_test.shape[0]):
 pred=model.predict(x_test[i].reshape(1,x_test.shape[1]))
 isbot=np.argmax(pred)
 if isbot==0:
   isbot="не бот"
 else:
   isbot="является ботом"
 isbot_ver=int(round(pred[0][1]*100))
 nobot_ver=int(round(pred[0][0]*100))
 res=dict()
 res['isbot']=isbot_ver
 res['nobot']=nobot_ver
print(json.dumps(res));
 #print(f"ID {hit_ids[i]} скорее всего {isbot}, вероятность что бот - {isbot_ver}%, что не бот - {nobot_ver}%")