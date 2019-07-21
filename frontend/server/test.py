from json import dump
import time

mydic={}
mydic["code"]=1
mydic["msg"]="123"
with open('out.json','w') as myfile:
	dump(mydic,myfile)
print(mydic)