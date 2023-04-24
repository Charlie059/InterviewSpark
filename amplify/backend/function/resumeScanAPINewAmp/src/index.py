import json
import boto3
import base64
import textract
import os
import requests

def handler(event, context):

  analyzerAPIUrl = "http://ec2-13-58-246-250.us-east-2.compute.amazonaws.com:8000/API/JobDes-Resume"
  print('received event:')
  print(json.loads(event['body'])['resume_url'])

  bucket="hbjobseekerv25f2ae5596ba14991acf956e243319061155915-dev"
  os.chdir('/tmp')
  if not os.path.exists(os.path.join('mydir')):
          os.makedirs('mydir')


  filename = json.loads(event['body'])['resume_name']
  save_path = os.path.join(os.getcwd(), 'mydir', filename)
  f = open(save_path, "wb")
  f.write(base64.b64decode(json.loads(event['body'])['resume_file']))
  f.close()
  wordtext = textract.process(save_path)
  text1 = wordtext.decode('utf-8')
  client = boto3.client('textract')

  payload = {}
  payload['Token'] = "eb4674756f913019de326cf1d3a7707c4ec640323c3e51a7f5b4cbc3672eae23"
  payload['JobDes'] = json.loads(event['body'])['jobDescription']
  payload['Resume'] = text1
  res = requests.post(analyzerAPIUrl, data=payload)
  data = res.content.decode()

  os.remove(save_path)


#
#     #process using S3 object
#   response = client.detect_document_text(
#                             Document = {
#                                       'Bytes': base64.b64decode(json.loads(event['body'])['resume_file'])
#                                   })
#
#     #Get the text blocks
#   blocks=response['Blocks']
#   print(blocks)

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(data)
  }
