# -*- coding: utf-8 -*-

import pandas as pd
import numpy as np
from PIL import Image
import shutil,os


#df = pd.read_csv('HAM10000_metadata.csv')

def get_data(path):
    df = pd.read_csv(path)
    
    #akiec: 光化性角化病和上皮内癌/ Bowen病
    #bcc: 基底细胞癌
    #bkl: 良性角化病样病变（太阳痣/脂溢性角化病和角化病，类似角化病
    #df: 皮肤纤维瘤
    #mel: 黑素瘤
    #nv: 黑素细胞痣
    #vasc: 血管病变（血管瘤，血管角化瘤，化脓性肉芽肿和出血
    category = ['MEL', 'NV', 'BCC', 'AKIEC', 'BKL', 'DF', 'VASC']

    df = df[['image_id','dx']]
    for i,elem in df.iterrows():
        print(elem[0])
        img = Image.open(elem[0]+'.jpg')
        arr = np.array(img)
        label = [0]*7
        label[category.index(elem[1].upper())] = 1
        yield arr,label

def classify(path):
    df = pd.read_csv(path)
    df = df[['image_id','dx']]
    for i,elem in df.iterrows():
        shutil.move(elem[0]+'.jpg',elem[1].upper())

def cls():
    for a in ['akiec','bcc','bkl','df','mel','nv','vasc']:
        file_list = os.listdir('train/'+a.upper())
        num = int(len(file_list)*0.1)
        for img in file_list[:num]:
            shutil.move('train/'+a.upper()+'/'+img,'validation/'+a.upper())
        for img in file_list[num:2*num]:
            shutil.move('train/'+a.upper()+'/'+img,'test/'+a.upper())

if __name__=='__main__':
    path = 'HAM10000_metadata.csv'
    cls()
        
