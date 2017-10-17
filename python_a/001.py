val = input('请输入带单位的温度值')
if val[-1] in ['C', 'c']:
    f = 1.8 * float(val[0:-1]) + 32
    print('转换后: %.2fF' %f)
elif val[-1] in ['f', 'F']:
    c = (float(val[0:-1]) - 32) / 1.8
    print('转换后: %.2fC' %c)
else:
    print('输入有误')


