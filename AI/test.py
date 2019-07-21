from __future__ import print_function


import torch

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

from utils.pytorch_utils import *
import data_reader
def test():
    model = torch.load("/home/qizhoupeng/python workspace/result/0_epoch_pnas_large_0_sgd_no_aug_ckpt.t7")['model']
    model.eval()
    val_loss = 0
    correct = 0
    total = 0
    target_all = []
    predicted_all = []
    trainloader, testloader = data_reader.get_data_loader(1)

    with torch.no_grad():
        if __name__ == '__main__':
            for batch_idx, (inputs, targets) in enumerate(trainloader):
                # if batch_idx > 10:
                #     break

                inputs, targets = inputs.to(device), targets.to(device)
                outputs = model(inputs)
                predicted_values, predicted = outputs.max(1)
                predicted_reshaped = predicted.cpu().numpy().reshape(-1)
                predicted_all = np.concatenate((predicted_all, predicted_reshaped), axis=0)
                targets_reshaped = targets.data.cpu().numpy().reshape(-1)
                target_all = np.concatenate((target_all, targets_reshaped), axis=0)
                total += targets.size(0)
                c = predicted
                correct += predicted.eq(targets).sum().item()
                # print("=" * 20)
                # print(predicted)
                # print(targets.data)
    print(correct/total)
#     data, label = Variable(data, volatile=True), Variable(label)
#     output = model(data)
#     #out = output.view(-1, 4)
#     print(output)
#     #test_loss = criterion(out[:, 0:2], out[:, 2:4], label).data[0]
#     #pred = classify(out.data[:, 0:2], out.data[:, 2:4])
#     #correct = pred.eq(label.data).sum()
#
# if __name__=='__main__':
#     img = Image.open(r'D:\imagedata\test\AKIEC\ISIC_0025182.jpg')
#
#     img = np.asarray(img)
#     #print(img.shape)
#     img = img.reshape([1,450,600,3])
#     img = torch.Tensor(img)
#     label = [0,0,0,1,0,0,0]
#     label = torch.Tensor(label)
#     test(img,label)
test()
